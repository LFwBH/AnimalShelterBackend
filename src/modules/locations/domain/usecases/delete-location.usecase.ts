import { TransactionalUseCase } from "../../../../common/UseCase";

export interface DeleteLocationUseCase
  extends TransactionalUseCase<number, void> {}
