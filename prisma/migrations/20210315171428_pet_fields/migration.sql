-- AlterTable
ALTER TABLE "pet" ADD COLUMN     "passport" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "has_gone" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "archived" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "archive_date" TIMESTAMP(3),
ADD COLUMN     "reviewed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sterilized" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sterilization_date" TIMESTAMP(3),
ADD COLUMN     "came_from" TEXT;
