import { CamelCase, SnakeCase } from "type-fest";

import { PetModel } from "../models/pet.model";

type FieldsToOmit =
  | "id"
  | "createdAt"
  | "updatedAt"
  | "cameFrom"
  | "description"
  | "placements";

export type PetFilterPort = {
  [K in SnakeCase<keyof Omit<PetModel, FieldsToOmit>>]: Omit<
    PetModel,
    FieldsToOmit
  >[CamelCase<K>];
};
