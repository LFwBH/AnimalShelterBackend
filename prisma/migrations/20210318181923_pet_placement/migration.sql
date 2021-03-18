-- CreateTable
CREATE TABLE "placement" (
    "id_placement" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id_placement")
);

-- CreateTable
CREATE TABLE "pet_placement" (
    "id_pet_placement" SERIAL NOT NULL,
    "id_pet" INTEGER NOT NULL,
    "id_placement" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id_pet_placement")
);

-- AddForeignKey
ALTER TABLE "pet_placement" ADD FOREIGN KEY ("id_pet") REFERENCES "pet"("id_pet") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pet_placement" ADD FOREIGN KEY ("id_placement") REFERENCES "placement"("id_placement") ON DELETE CASCADE ON UPDATE CASCADE;
