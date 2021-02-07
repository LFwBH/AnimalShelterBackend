import {
  INestApplication,
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { Test, TestingModule } from "@nestjs/testing";
import * as faker from "faker";
import * as request from "supertest";

import { HttpExceptionFilter } from "../src/filters/http-exception.filter";
import { Breed, Color, Pet, Sex } from "../src/pets/domain/entities/pet.entity";
import { PETS_REPOSITORY } from "../src/pets/domain/providers";
import { PetsRepository } from "../src/pets/domain/repositories/pets.repository";
import { PetsModule } from "../src/pets/pets.module";
import { PrismaService } from "../src/services/prisma.service";

describe("PetsController (e2e)", () => {
  let app: INestApplication;

  const mockPrismaService: OnModuleInit & OnModuleDestroy = {
    onModuleDestroy: async () => {},
    onModuleInit: async () => {},
  };

  const mockPrismaPetsRepository: PetsRepository = {
    create: async (pet: Pet) => {
      return Pet.new({
        ...pet,
        id: faker.random.number(),
        color: await Color.new({
          id: pet.color.id,
          name: undefined,
        }),
        breed: await Breed.new({
          id: pet.breed.id,
          name: undefined,
        }),
        sex: await Sex.new({
          id: pet.sex.id,
          name: undefined,
        }),
      });
    },
    // findAll: async () => [],
    // findOne: async (id: number) => null,
    // remove: async (id: number) => {},
    // update: async (id: number, pet: Pet) => {},
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PetsModule],
      providers: [
        {
          provide: APP_FILTER,
          useClass: HttpExceptionFilter,
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
    const schema = {
      properties: {
        code: { type: "number" },
        message: { type: "string" },
        data: {
          type: "object",
          properties: {
            id: { type: "number" },
            name: { type: "string" },
            description: { type: "string" },
            special: { type: "boolean" },
            age: { type: "number" },
            breed: {
              type: "object",
              properties: {
                id: {
                  type: "number",
                },
                name: {
                  type: "number",
                },
              },
            },
            sex: {
              type: "object",
              properties: {
                id: {
                  type: "number",
                },
                name: {
                  type: "number",
                },
              },
            },
            color: {
              type: "object",
              properties: {
                id: {
                  type: "number",
                },
                name: {
                  type: "number",
                },
              },
            },
          },
          required: [
            "id",
            "name",
            "description",
            "special",
            "age",
            "breed",
            "color",
            "sex",
          ],
        },
        timestamp: { type: "number" },
      },
      required: ["code", "message", "data", "timestamp"],
    };

    return request(app.getHttpServer())
      .post("/pets")
      .send({
        name: faker.name.findName(),
        description: faker.lorem.sentence(),
        special: faker.random.boolean(),
        age: faker.random.number({ min: 1, max: 20 }),
        breedId: faker.random.number({ min: 1, max: 10 }),
        colorId: faker.random.number({ min: 1, max: 6 }),
        sexId: faker.random.number({ min: 1, max: 2 }),
      })
      .expect(201)
      .expect((res) => {
        expect(schema).toBeValidSchema();
        expect(res.body.message).toEqual("Success");
        expect(res.body).toMatchSchema(schema);
      });
  });

  it("/pets (POST 400)", () => {
    const schema = {
      properties: {
        code: { type: "number" },
        message: { type: "string" },
        data: {
          type: "object",
          properties: {
            context: { type: "string" },
            errors: {
              type: "array",
              contains: {
                type: "object",
                properties: {
                  property: { type: "string" },
                  message: { type: "array", contains: { type: "string" } },
                },
                required: ["property", "message"],
              },
              minItems: 3,
              maxItems: 3,
            },
          },
          required: ["context", "errors"],
        },
        timestamp: { type: "number" },
      },
      required: ["code", "message", "data", "timestamp"],
    };

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
});
