-- CreateTable
CREATE TABLE "breed" (
    "id_breed" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id_breed")
);

-- CreateTable
CREATE TABLE "color" (
    "id_color" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id_color")
);

-- CreateTable
CREATE TABLE "sex" (
    "id_sex" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id_sex")
);

-- CreateTable
CREATE TABLE "pet" (
    "id_pet" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "special" BOOLEAN NOT NULL DEFAULT false,
    "id_breed" INTEGER NOT NULL,
    "id_color" INTEGER NOT NULL,
    "id_sex" INTEGER NOT NULL,

    PRIMARY KEY ("id_pet")
);

-- AddForeignKey
ALTER TABLE "pet" ADD FOREIGN KEY ("id_breed") REFERENCES "breed"("id_breed") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pet" ADD FOREIGN KEY ("id_color") REFERENCES "color"("id_color") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pet" ADD FOREIGN KEY ("id_sex") REFERENCES "sex"("id_sex") ON DELETE CASCADE ON UPDATE CASCADE;
