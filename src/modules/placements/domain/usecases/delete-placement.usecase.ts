import { TransactionalUseCase } from "../../../../common/UseCase";

export interface DeletePlacementUseCase
  extends TransactionalUseCase<number, void> {}
