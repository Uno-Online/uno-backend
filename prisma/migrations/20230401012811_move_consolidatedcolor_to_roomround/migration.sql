/*
  Warnings:

  - You are about to drop the column `consolidatedColor` on the `roomcard` table. All the data in the column will be lost.
  - Added the required column `consolidatedColor` to the `RoomRound` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `roomcard` DROP COLUMN `consolidatedColor`;

-- AlterTable
ALTER TABLE `roomround` ADD COLUMN `consolidatedColor` ENUM('RED', 'BLUE', 'GREEN', 'YELLOW', 'WILDCARD') NOT NULL;
