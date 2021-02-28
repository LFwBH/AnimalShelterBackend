import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { ClassType } from "./ClassType";
import { ICoreApiResponse } from "./CoreApiResponse";
import { Nullable } from "./Nullable";

export function ApiGenericResponse<T extends ClassType>(
  ResourceType: T | T[],
): ClassType {
  class ApiResponse implements ICoreApiResponse<T> {
    @ApiProperty() public readonly code: number;
    @ApiProperty() public readonly message: string;
    @ApiProperty() public readonly timestamp: number;
    @ApiPropertyOptional({ type: ResourceType })
    public readonly data: Nullable<T>;
  }

  return ApiResponse;
}
