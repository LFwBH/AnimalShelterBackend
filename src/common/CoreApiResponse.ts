import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { Code } from "./Code";
import { Nullable } from "./Nullable";

export interface ICoreApiResponse<TData> {
  code: number;
  message: string;
  timestamp: number;
  data: Nullable<TData>;
}

export class CoreApiResponse<TData> implements ICoreApiResponse<TData> {
  @ApiProperty() readonly code: number;
  @ApiProperty() readonly message: string;
  @ApiProperty() readonly timestamp: number;
  @ApiPropertyOptional() readonly data: Nullable<TData>;

  private constructor(code: number, message: string, data?: TData) {
    this.code = code;
    this.message = message;
    this.data = data || null;
    this.timestamp = Date.now();
  }

  static success<TData>(
    data?: TData,
    message?: string,
  ): CoreApiResponse<TData> {
    const resultCode: number = Code.SUCCESS.code;
    const resultMessage: string = message || Code.SUCCESS.message;

    return new CoreApiResponse(resultCode, resultMessage, data);
  }

  static error<TData>(
    code?: number,
    message?: string,
    data?: TData,
  ): CoreApiResponse<TData> {
    const resultCode: number = code || Code.INTERNAL_ERROR.code;
    const resultMessage: string = message || Code.INTERNAL_ERROR.message;

    return new CoreApiResponse(resultCode, resultMessage, data);
  }
}
