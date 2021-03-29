import { LocationModel } from "../models/location.model";

export interface UpdateLocationPort
  extends Partial<Omit<LocationModel, "createdAt" | "updatedAt">> {}
