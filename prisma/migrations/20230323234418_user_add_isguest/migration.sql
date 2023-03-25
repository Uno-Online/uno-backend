/*
  Warnings:

  - Added the required column `isGuest` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `User_username_key` ON `user`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `isGuest` BOOLEAN NOT NULL;
