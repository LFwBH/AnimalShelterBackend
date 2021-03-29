import { LocationModel } from "../models/location.model";

export interface CreateLocationPort
  extends Omit<LocationModel, "id" | "createdAt" | "updatedAt"> {}
