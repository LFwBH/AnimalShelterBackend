export interface CreatePetPort {
  readonly name: string;
  readonly description: string;
  readonly special: boolean;
  readonly age: number;
  readonly breedId: number;
  readonly colorId: number;
  readonly sexId: number;
}
