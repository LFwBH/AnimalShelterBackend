import { RepositoryPageOptions } from "common/RepositoryPageOptions";

import { Optional } from "../../../../common/Optional";
import { PlacementModel } from "../models/placement.model";
import { CreatePetPlacementPort } from "../ports/create-pet-placement.port";
import { CreatePlacementPort } from "../ports/create-placement.port";
import { DeletePetPlacementPort } from "../ports/delete-pet-placement.port";

export interface PlacementRepository {
  create(placement: CreatePlacementPort): Promise<PlacementModel>;

  findAll(page: RepositoryPageOptions): Promise<Iterable<PlacementModel>>;

  findById(id: number): Promise<Optional<PlacementModel>>;

  delete(id: number): Promise<void>;

  addPlacementToPet(petPlacement: CreatePetPlacementPort): Promise<void>;

  deletePlacementFromPet(petPlacement: DeletePetPlacementPort): Promise<void>;
}
