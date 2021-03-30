export interface CryptoService {
  hash(value: string): Promise<string>;

  verify(value: string, other: string): Promise<boolean>;
}
