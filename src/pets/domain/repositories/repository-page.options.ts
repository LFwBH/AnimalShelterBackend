import { IsNumber, IsOptional } from "class-validator";

export class RepositoryPageOptions {
  @IsNumber() @IsOptional() readonly cursor: number;
  @IsNumber() @IsOptional() readonly take: number;
}
