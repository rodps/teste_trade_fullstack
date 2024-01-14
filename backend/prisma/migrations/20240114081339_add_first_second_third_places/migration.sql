/*
  Warnings:

  - You are about to drop the column `winnerId` on the `championships` table. All the data in the column will be lost.
  - Added the required column `firstId` to the `championships` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fourthId` to the `championships` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secondId` to the `championships` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thirdId` to the `championships` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "championships" DROP CONSTRAINT "championships_winnerId_fkey";

-- AlterTable
ALTER TABLE "championships" DROP COLUMN "winnerId",
ADD COLUMN     "firstId" INTEGER NOT NULL,
ADD COLUMN     "fourthId" INTEGER NOT NULL,
ADD COLUMN     "secondId" INTEGER NOT NULL,
ADD COLUMN     "thirdId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "championships" ADD CONSTRAINT "championships_firstId_fkey" FOREIGN KEY ("firstId") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "championships" ADD CONSTRAINT "championships_secondId_fkey" FOREIGN KEY ("secondId") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "championships" ADD CONSTRAINT "championships_thirdId_fkey" FOREIGN KEY ("thirdId") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "championships" ADD CONSTRAINT "championships_fourthId_fkey" FOREIGN KEY ("fourthId") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
