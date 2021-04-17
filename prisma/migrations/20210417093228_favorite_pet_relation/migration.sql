/*
  Warnings:

  - Added the required column `id_pet` to the `favorite_pet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "favorite_pet" ADD COLUMN     "id_pet" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "favorite_pet" ADD FOREIGN KEY ("id_pet") REFERENCES "pet"("id_pet") ON DELETE CASCADE ON UPDATE CASCADE;
