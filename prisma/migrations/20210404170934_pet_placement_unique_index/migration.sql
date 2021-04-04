/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[id_pet,id_placement]` on the table `pet_placement`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "pet_placement.id_pet_id_placement_unique" ON "pet_placement"("id_pet", "id_placement");
