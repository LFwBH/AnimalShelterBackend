/*
  Warnings:

  - Added the required column `age` to the `pet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pet" ADD COLUMN     "age" DECIMAL(65,30) NOT NULL;
