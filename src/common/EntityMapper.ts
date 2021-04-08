export interface EntityMapper<T, R> {
  toEntity(value: T): R;
}
