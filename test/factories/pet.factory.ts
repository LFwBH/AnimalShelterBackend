import * as faker from "faker/locale/en";
import { Factory } from "rosie";

import { PetModel } from "../../src/modules/pets/domain/models/pet.model";
import { getRandomOneOf } from "../helpers";

export const PetFactory = Factory.define<PetModel>("pet")
  .sequence("id")
  .attr("age", () => faker.datatype.number())
  .attr("archived", () => faker.datatype.boolean())
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
  .attr("dead", () => faker.datatype.boolean())
  .attr("kind", () => getRandomOneOf<"Dog" | "Cat">(["Dog", "Cat"]))
  .attr("name", () => faker.name.findName())
  .attr("passport", () => faker.datatype.boolean())
  .attr("reviewed", () => faker.datatype.boolean())
  .attr("sex", () => getRandomOneOf<"Boy" | "Girl">(["Boy", "Girl"]))
  .attr("special", () => faker.datatype.boolean())
  .attr("sterilized", () => faker.datatype.boolean())
  .attr("sterilizationDate", ["sterilized"], (sterilized) => {
    if (sterilized) {
      return faker.date.recent();
    }
  });
