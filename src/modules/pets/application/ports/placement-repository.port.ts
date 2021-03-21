import { Optional } from "../../../../common/Optional";
import { PlacementModel } from "../../../placements/domain/models/placement.model";
import { AddPlacementPort } from "../../domain/ports/add-placement.port";

export interface PlacementRepositoryPort {
  addPlacementToPet(petPlacement: AddPlacementPort): Promise<void>;

  findById(id: number): Promise<Optional<PlacementModel>>;
}
