import { Optional } from "./Optional";

export interface UseCase<TUseCasePort, TUseCaseResult> {
  execute(port: Optional<TUseCasePort>): Promise<TUseCaseResult>;
}

export interface TransactionalUseCase<TUseCasePort, TUseCaseResult>
  extends UseCase<TUseCasePort, TUseCaseResult> {
  onCommit?: (result: TUseCaseResult, port: TUseCasePort) => Promise<void>;
  onRollback?: (error: Error, port: TUseCasePort) => Promise<void>;
}
