export interface LostPetModel {
  readonly id: number;
  readonly archived: boolean;
  readonly archiveDate: Date;
  readonly description: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
