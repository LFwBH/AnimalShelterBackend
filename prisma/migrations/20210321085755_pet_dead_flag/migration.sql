/*
  Warnings:

  - You are about to drop the column `has_gone` on the `pet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "pet" DROP COLUMN "has_gone",
ADD COLUMN     "dead" BOOLEAN NOT NULL DEFAULT false;
