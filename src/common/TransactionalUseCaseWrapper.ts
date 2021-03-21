import { PrismaService } from "../services/prisma.service";
import { Optional } from "./Optional";
import { TransactionalUseCase, UseCase } from "./UseCase";

export class TransactionalUseCaseWrapper<TUseCasePort, TUseCaseResult>
  implements UseCase<TUseCasePort, TUseCaseResult> {
  constructor(
    private readonly useCase: TransactionalUseCase<
      TUseCasePort,
      TUseCaseResult
    >,
    private readonly prismaService: PrismaService,
  ) {}

  async execute(port: TUseCasePort): Promise<TUseCaseResult> {
    let result: Optional<TUseCaseResult>;
    let error: Optional<Error>;

    try {
      await this.prismaService.$queryRaw`BEGIN`;
      result = await this.useCase.execute(port);
      await this.prismaService.$queryRaw`COMMIT`;
      this.useCase.onCommit?.(result, port);
    } catch (error_: unknown) {
      error = error_ as Error;
      await this.prismaService.$queryRaw`ROLLBACK`;
      this.useCase.onRollback?.(error, port);
    }

    if (error) {
      throw error;
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return result!;
  }
}
