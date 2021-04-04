import { Optional } from "../../../../common/Optional";
import { PlacementModel } from "../../../placements/domain/models/placement.model";
import { AddPlacementPort } from "../../domain/ports/add-placement.port";
import { DeletePlacementPort } from "./delete-placement.port";

export interface PlacementRepositoryPort {
  findById(id: number): Promise<Optional<PlacementModel>>;

  addPlacementToPet(petPlacement: AddPlacementPort): Promise<void>;

  deletePlacementFromPet(petPlacement: DeletePlacementPort): Promise<void>;
}
