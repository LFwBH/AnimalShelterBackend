export interface CreatePetPort {
  readonly name: string;
  readonly description: string;
  readonly special: boolean;
  readonly age: number;
  readonly kind: "Dog" | "Cat";
  readonly color: string;
  readonly sex: "Boy" | "Girl";
}
