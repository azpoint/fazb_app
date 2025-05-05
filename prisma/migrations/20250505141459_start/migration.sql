/*
  Warnings:

  - The primary key for the `Suite` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Suite` table. All the data in the column will be lost.
  - The required column `suite_id` was added to the `Suite` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Suite" DROP CONSTRAINT "Suite_pkey",
DROP COLUMN "id",
ADD COLUMN     "suite_id" TEXT NOT NULL,
ADD CONSTRAINT "Suite_pkey" PRIMARY KEY ("suite_id");
