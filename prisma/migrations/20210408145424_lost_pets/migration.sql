-- CreateTable
CREATE TABLE "lost_pet" (
    "id_lost_pet" SERIAL NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "archive_date" TIMESTAMP(3),
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id_lost_pet")
);

-- CreateTable
CREATE TABLE "lost_pet_image" (
    "id_lost_pet_image" SERIAL NOT NULL,
    "id_lost_pet" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id_lost_pet_image")
);

-- CreateTable
CREATE TABLE "user_lost_pet" (
    "id_user_lost_pet" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "id_lost_pet" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id_user_lost_pet")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_lost_pet.id_user_id_user_lost_pet_unique" ON "user_lost_pet"("id_user", "id_user_lost_pet");

-- AddForeignKey
ALTER TABLE "lost_pet_image" ADD FOREIGN KEY ("id_lost_pet") REFERENCES "lost_pet"("id_lost_pet") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_lost_pet" ADD FOREIGN KEY ("id_user") REFERENCES "user"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_lost_pet" ADD FOREIGN KEY ("id_lost_pet") REFERENCES "lost_pet"("id_lost_pet") ON DELETE CASCADE ON UPDATE CASCADE;
