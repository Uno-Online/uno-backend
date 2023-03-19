/*
  Warnings:

  - The values [BLOCK,COLOR_SWAP,SUM_FOUR,SUM_TWO] on the enum `Card_symbol` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Card` MODIFY `symbol` ENUM('SKIP', 'REVERSE', 'COLOR_CHANGING', 'DRAW_FOUR', 'DRAW_TWO', 'NUMERIC') NOT NULL;
