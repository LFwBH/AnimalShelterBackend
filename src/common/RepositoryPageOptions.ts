import { Optional } from "./Optional";

export interface RepositoryPageOptions {
  readonly cursor: Optional<number>;
  readonly take: Optional<number>;
}
