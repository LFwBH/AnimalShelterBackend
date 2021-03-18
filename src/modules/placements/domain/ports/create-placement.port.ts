import { PlacementModel } from "../models/placement.model";

export interface CreatePlacementPort
  extends Omit<PlacementModel, "id" | "createdAt" | "updatedAt"> {}
