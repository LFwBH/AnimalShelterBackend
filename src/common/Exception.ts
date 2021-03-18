import { CodeDescription } from "./Code";
import { Optional } from "./Optional";

export type CreateExceptionPayload<TData> = {
  code: CodeDescription;
  message?: string;
  data?: TData;
};

export class Exception<TData> extends Error {
  public readonly code: number;
  public readonly status: number;
  public readonly data: Optional<TData>;

  private constructor(code: CodeDescription, message?: string, data?: TData) {
    super();

    this.name = this.constructor.name;
    this.code = code.code;
    this.status = code.status;
    this.data = data;
    this.message = message || code.message;

    Error.captureStackTrace(this, this.constructor);
  }

  public static new<TData>(
    payload: CreateExceptionPayload<TData>,
  ): Exception<TData> {
    return new Exception(payload.code, payload.message, payload.data);
  }
}
