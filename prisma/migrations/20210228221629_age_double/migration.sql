/*
  Warnings:

  - You are about to alter the column `age` on the `pet` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "pet" ALTER COLUMN "age" SET DATA TYPE DOUBLE PRECISION;
