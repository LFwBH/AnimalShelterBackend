-- CreateTable
CREATE TABLE "favorite_pet" (
    "id_favorite_pet" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id_favorite_pet")
);

-- CreateTable
CREATE TABLE "user_favorite_pet" (
    "id_user_favorite_pet" SERIAL NOT NULL,
    "id_favorite_pet" INTEGER NOT NULL,
    "id_user" INTEGER NOT NULL,

    PRIMARY KEY ("id_user_favorite_pet")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_favorite_pet.id_favorite_pet_id_user_unique" ON "user_favorite_pet"("id_favorite_pet", "id_user");

-- AddForeignKey
ALTER TABLE "user_favorite_pet" ADD FOREIGN KEY ("id_favorite_pet") REFERENCES "favorite_pet"("id_favorite_pet") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_favorite_pet" ADD FOREIGN KEY ("id_user") REFERENCES "user"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;
