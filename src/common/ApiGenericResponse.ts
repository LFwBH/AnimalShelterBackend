import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { ClassType } from "./ClassType";
import { ICoreApiResponse } from "./CoreApiResponse";
import { Nullable } from "./Nullable";

export function ApiGenericResponse<T extends ClassType>(
  ResourceType: T | T[],
): ClassType {
  class ApiResponse implements ICoreApiResponse<T> {
    @ApiProperty() readonly code: number;
    @ApiProperty() readonly message: string;
    @ApiProperty() readonly timestamp: number;
    @ApiPropertyOptional({ type: ResourceType })
    readonly data: Nullable<T>;
  }

  return ApiResponse;
}
