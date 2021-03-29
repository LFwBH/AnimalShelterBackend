import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { Optional } from "../../../../common/Optional";
import { LocationModel } from "../../domain/models/location.model";

export class LocationResponse implements LocationModel {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly description: string;

  @ApiPropertyOptional({ type: String })
  readonly image: Optional<string>;

  @ApiProperty({ type: Date })
  readonly createdAt: Date;

  @ApiProperty({ type: Date })
  readonly updatedAt: Date;
}
