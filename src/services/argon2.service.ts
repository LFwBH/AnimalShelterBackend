import { Injectable } from "@nestjs/common";
import * as argon2 from "argon2";

import { CryptoService } from "../common/CryptoService";

@Injectable()
export class Argon2Service implements CryptoService {
  hash(value: string): Promise<string> {
    return argon2.hash(value);
  }

  verify(value: string, other: string): Promise<boolean> {
    return argon2.verify(value, other);
  }
}
