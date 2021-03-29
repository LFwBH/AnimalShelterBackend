import { Optional } from "../../../../common/Optional";

export interface LocationModel {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly image: Optional<string>;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
