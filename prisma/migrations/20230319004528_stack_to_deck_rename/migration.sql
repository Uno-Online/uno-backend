/*
  Warnings:

  - The values [ON_STACK] on the enum `RoomCard_state` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `RoomCard` MODIFY `state` ENUM('ON_HOLD', 'ON_DECK', 'DISPOSED') NOT NULL;
