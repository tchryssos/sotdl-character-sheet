/*
  Warnings:

  - You are about to alter the column `displayName` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(25)`.

*/
-- AlterTable
ALTER TABLE "user" ALTER COLUMN "displayName" SET DATA TYPE VARCHAR(25);
