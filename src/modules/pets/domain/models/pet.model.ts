export interface PetModel {
  readonly id: number;
  readonly name: string;
  readonly age: number;
  readonly description: string;
  readonly special: boolean;
  readonly color: string;
  readonly kind: "Dog" | "Cat";
  readonly sex: "Boy" | "Girl";
}
