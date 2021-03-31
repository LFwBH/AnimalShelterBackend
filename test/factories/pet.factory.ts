import * as faker from "faker/locale/en";
import { Factory } from "rosie";

import { PetModel } from "../../src/modules/pets/domain/models/pet.model";
import { getRandomOneOf } from "../helpers";

export const PetFactory = Factory.define<PetModel>("pet")
  .sequence("id")
  .attr("age", () => faker.random.number())
  .attr("archived", () => faker.random.boolean())
  .attr("archiveDate", ["archived"], (archived) => {
    if (archived) {
      return faker.date.recent();
    }
  })
  .attr("cameFrom", () => faker.lorem.paragraph())
  .attr("color", () => faker.internet.color())
  .attr("createdAt", () => faker.date.recent())
  .attr("updatedAt", () => faker.date.recent())
  .attr("description", () => faker.lorem.paragraph())
  .attr("dead", () => faker.random.boolean())
  .attr("kind", () => getRandomOneOf<"Dog" | "Cat">(["Dog", "Cat"]))
  .attr("name", () => faker.name.findName())
  .attr("passport", () => faker.random.boolean())
  .attr("reviewed", () => faker.random.boolean())
  .attr("sex", () => getRandomOneOf<"Boy" | "Girl">(["Boy", "Girl"]))
  .attr("special", () => faker.random.boolean())
  .attr("sterilized", () => faker.random.boolean())
  .attr("sterilizationDate", ["sterilized"], (sterilized) => {
    if (sterilized) {
      return faker.date.recent();
    }
  });
