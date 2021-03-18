import { Optional } from "./Optional";
import { TransactionalUseCase, UseCase } from "./UseCase";

export class TransactionalUseCaseWrapper<TUseCasePort, TUseCaseResult>
  implements UseCase<TUseCasePort, TUseCaseResult> {
  constructor(
    private readonly useCase: TransactionalUseCase<
      TUseCasePort,
      TUseCaseResult
    >,
  ) {}

  public async execute(port: TUseCasePort): Promise<TUseCaseResult> {
    let result: Optional<TUseCaseResult>;
    let error: Optional<Error>;

    try {
      // TODO: implement DB transactions
      result = await this.useCase.execute(port);
      this.useCase.onCommit?.(result, port);
    } catch (error_: unknown) {
      error = error_ as Error;
      this.useCase.onRollback?.(error, port);
    }

    if (error) {
      throw error;
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return result!;
  }
}
