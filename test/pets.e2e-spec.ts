import {
  INestApplication,
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { Test, TestingModule } from "@nestjs/testing";
import * as faker from "faker/locale/en";
import * as request from "supertest";

import { HttpExceptionFilter } from "../src/filters/http-exception.filter";
import { PetModel } from "../src/modules/pets/domain/models/pet.model";
import { PETS_REPOSITORY } from "../src/modules/pets/domain/providers";
import { PetsRepository } from "../src/modules/pets/domain/repositories/pets.repository";
import { PetsModule } from "../src/modules/pets/pets.module";
import { LOGGER_SERVICE } from "../src/providers";
import { PrismaService } from "../src/services/prisma.service";
import getHttpErrorSchema from "./helpers/getHttpErrorSchema";
import getPetSchema from "./helpers/getPetSchema";
import getRandomPet, { getRandomOneOf } from "./helpers/getRandomPet";
import getResponseSchema from "./helpers/getResponseSchema";
import { LoggerMock } from "./mocks/logger.mock";

describe("PetsController (e2e)", () => {
  let app: INestApplication;

  const mockPrismaService: OnModuleInit &
    OnModuleDestroy &
    Record<string, Function> = {
    $queryRaw: () => {},
    onModuleDestroy: async () => {},
    onModuleInit: async () => {},
  };

  const mockPrismaPetsRepository: PetsRepository = {
    create: async (pet) => {
      return getRandomPet(pet);
    },

    update: async (pet) => {
      return getRandomPet(pet);
    },

    findById: async (id) => {
      return getRandomPet({ id });
    },

    findAll: async (page) => {
      const pets: PetModel[] = [];

      if (page?.take != null) {
        for (
          let i = page.cursor ?? 0;
          i < (page.cursor ?? 0) + page.take;
          i++
        ) {
          const pet = await getRandomPet({ id: i });
          pets.push(pet);
        }
      }

      return pets;
    },
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PetsModule],
      providers: [
        {
          provide: APP_FILTER,
          useClass: HttpExceptionFilter,
        },
        {
          provide: LOGGER_SERVICE,
          useClass: LoggerMock,
        },
      ],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .overrideProvider(PETS_REPOSITORY)
      .useValue(mockPrismaPetsRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/pets (POST 201)", () => {
    const schema = getResponseSchema(getPetSchema());

    return request(app.getHttpServer())
      .post("/pets")
      .send({
        name: faker.name.findName(),
        description: faker.lorem.sentence(),
        special: faker.random.boolean(),
        age: faker.random.number({ min: 1, max: 20 }),
        kind: getRandomOneOf(["Dog", "Cat"]),
        sex: getRandomOneOf(["Boy", "Girl"]),
        color: faker.internet.color(),
      })
      .expect(201)
      .expect((res) => {
        expect(schema).toBeValidSchema();
        expect(res.body.message).toEqual("Success");
        expect(res.body).toMatchSchema(schema);
      });
  });

  it("/pets (POST 400)", () => {
    const schema = getResponseSchema(
      getHttpErrorSchema({ minItems: 3, maxItems: 3 }),
    );

    return request(app.getHttpServer())
      .post("/pets")
      .send({
        name: faker.name.findName(),
        description: faker.lorem.sentence(),
        special: faker.random.boolean(),
        age: faker.random.number({ min: 1, max: 20 }),
      })
      .expect(400)
      .expect((res) => {
        expect(schema).toBeValidSchema();
        expect(res.body.message).toEqual("Use-case port validation error");
        expect(res.body).toMatchSchema(schema);
      });
  });

  it("/pets?take=10 (GET)", () => {
    const schema = getResponseSchema({
      type: "array",
      contains: getPetSchema(),
      minItems: 10,
      maxItems: 10,
    });

    return request(app.getHttpServer())
      .get("/pets")
      .query({ take: 10 })
      .expect(200)
      .expect((res) => {
        expect(schema).toBeValidSchema();
        expect(res.body.message).toEqual("Success");
        expect(res.body).toMatchSchema(schema);
      });
  });

  it("/pets/1 (GET)", () => {
    const schema = getResponseSchema(getPetSchema());

    return request(app.getHttpServer())
      .get("/pets/1")
      .expect(200)
      .expect((res) => {
        expect(schema).toBeValidSchema();
        expect(res.body.message).toEqual("Success");
        expect(res.body).toMatchSchema(schema);
      });
  });
});
