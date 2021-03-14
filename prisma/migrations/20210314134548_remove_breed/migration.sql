/*
  Warnings:

  - You are about to drop the column `id_breed` on the `pet` table. All the data in the column will be lost.
  - You are about to drop the column `id_color` on the `pet` table. All the data in the column will be lost.
  - You are about to drop the column `id_sex` on the `pet` table. All the data in the column will be lost.
  - You are about to drop the `breed` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `color` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sex` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `color` to the `pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sex` to the `pet` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PetKind" AS ENUM ('Dog', 'Cat');

-- CreateEnum
CREATE TYPE "PetSex" AS ENUM ('Boy', 'Girl');

-- DropForeignKey
ALTER TABLE "pet" DROP CONSTRAINT "pet_id_breed_fkey";

-- DropForeignKey
ALTER TABLE "pet" DROP CONSTRAINT "pet_id_color_fkey";

-- DropForeignKey
ALTER TABLE "pet" DROP CONSTRAINT "pet_id_sex_fkey";

-- AlterTable
ALTER TABLE "pet" DROP COLUMN "id_breed",
DROP COLUMN "id_color",
DROP COLUMN "id_sex",
ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "sex" "PetSex" NOT NULL;

-- DropTable
DROP TABLE "breed";

-- DropTable
DROP TABLE "color";

-- DropTable
DROP TABLE "sex";
