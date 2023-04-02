/*
  Warnings:

  - You are about to drop the column `consolidatedColor` on the `RoomCard` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[playerId,roomId]` on the table `RoomPlayer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `consolidatedColor` to the `RoomRound` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Room_name_key` ON `Room`;

-- AlterTable
ALTER TABLE `RoomCard` DROP COLUMN `consolidatedColor`;

-- AlterTable
ALTER TABLE `RoomPlayer` ADD COLUMN `status` ENUM('DISCONNECTED', 'CONNECTED') NOT NULL DEFAULT 'CONNECTED';

-- AlterTable
ALTER TABLE `RoomRound` ADD COLUMN `consolidatedColor` ENUM('RED', 'BLUE', 'GREEN', 'YELLOW', 'WILDCARD') NOT NULL;

-- CreateTable
CREATE TABLE `UserSocketSession` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `UserSocketSession_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `RoomPlayer_playerId_roomId_key` ON `RoomPlayer`(`playerId`, `roomId`);

-- AddForeignKey
ALTER TABLE `UserSocketSession` ADD CONSTRAINT `UserSocketSession_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
