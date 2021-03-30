/* eslint-disable @typescript-eslint/ban-types */
import { Nullable } from "./Nullable";

export interface TokenService {
  sign(payload: string | Buffer | object): string;

  decode(token: string): Nullable<string | Record<string, unknown>>;

  verify<T extends object>(token: string): T;
}
