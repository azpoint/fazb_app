/*
  Warnings:

  - The `rev` column on the `Suite` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Suite" ALTER COLUMN "composedInit" DROP NOT NULL,
DROP COLUMN "rev",
ADD COLUMN     "rev" INTEGER;
