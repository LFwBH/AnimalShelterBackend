import { PrismaService } from "../services/prisma.service";
import { Nullable } from "./Nullable";
import { TransactionalUseCase, UseCase } from "./UseCase";

export class TransactionalUseCaseWrapper<TUseCasePort, TUseCaseResult>
  implements UseCase<TUseCasePort, TUseCaseResult> {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly useCase: TransactionalUseCase<
      TUseCasePort,
      TUseCaseResult
    >,
  ) {}

  public async execute(port: TUseCasePort): Promise<Nullable<TUseCaseResult>> {
    let result: Nullable<TUseCaseResult> = null;
    let error: Nullable<Error> = null;

    try {
      result = await this.useCase.execute(port);
      this.useCase.onCommit?.(result, port);
    } catch (error_: unknown) {
      error = error_ as Error;
      this.useCase.onRollback?.(error, port);
    }

    if (error) {
      throw error;
    }

    return result;
  }
}
