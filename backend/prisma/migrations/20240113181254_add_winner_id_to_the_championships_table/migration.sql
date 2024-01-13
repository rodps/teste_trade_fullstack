/*
  Warnings:

  - Added the required column `winnerId` to the `championships` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "championships" ADD COLUMN     "winnerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "championships" ADD CONSTRAINT "championships_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
