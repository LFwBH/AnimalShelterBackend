import { CreatePetPlacementPort } from "../../../placements/domain/ports/create-pet-placement.port";

export interface DeletePlacementPort
  extends Pick<CreatePetPlacementPort, "petId" | "placementId"> {}
