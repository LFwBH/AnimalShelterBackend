import { Factory } from "rosie";

import { PetResponse } from "../../src/modules/pets/application/swagger/pet.response";

export const PetSchemaFactory = Factory.define("petSchema")
  .attr("type", "object")
  .attr("properties", {
    age: { type: "number" },
    archived: { type: "boolean" },
    archiveDate: { type: "string" },
    cameFrom: { type: "string" },
    color: { type: "string" },
    createdAt: { type: "string" },
    description: { type: "string" },
    dead: { type: "boolean" },
    id: { type: "number" },
    kind: { type: "string" },
    name: { type: "string" },
    passport: { type: "boolean" },
    reviewed: { type: "boolean" },
    sex: { type: "string" },
    special: { type: "boolean" },
    sterilizationDate: { type: "string" },
    sterilized: { type: "boolean" },
    updatedAt: { type: "string" },
  } as Record<keyof PetResponse, object>)
  .attr("required", [
    "age",
    "archived",
    "cameFrom",
    "color",
    "createdAt",
    "description",
    "dead",
    "id",
    "kind",
    "name",
    "passport",
    "reviewed",
    "sex",
    "special",
    "sterilized",
    "updatedAt",
  ]);
