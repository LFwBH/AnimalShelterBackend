import { Optional } from "../../../../common/Optional";
import { PetPlacementModel } from "../../../placements/domain/models/pet-placement.model";

export interface PetModel {
  readonly id: number;
  readonly name: string;
  readonly age: number;
  readonly description: string;
  readonly special: boolean;
  readonly passport: boolean;
  readonly dead: boolean;
  readonly archived: boolean;
  readonly archiveDate: Optional<Date>;
  readonly reviewed: boolean;
  readonly sterilized: boolean;
  readonly sterilizationDate: Optional<Date>;
  readonly color: string;
  readonly kind: "Dog" | "Cat";
  readonly sex: "Boy" | "Girl";
  readonly cameFrom: Optional<string>;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly placements: PetPlacementModel[];
}
