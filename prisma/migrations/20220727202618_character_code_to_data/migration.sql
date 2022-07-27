/*
  Warnings:

  - You are about to drop the column `characterCode` on the `character` table. All the data in the column will be lost.
  - Added the required column `characterData` to the `character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rulebookName` to the `character` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "character" DROP COLUMN "characterCode",
ADD COLUMN     "characterData" JSONB NOT NULL,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "rulebookName" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "rulebook" (
    "id" SERIAL NOT NULL,
    "createdOn" TIMESTAMP(6) NOT NULL,
    "lastModifiedOn" TIMESTAMP(6) NOT NULL,
    "fullName" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "rulebook_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "rulebook_name_key" ON "rulebook"("name");

-- AddForeignKey
ALTER TABLE "character" ADD CONSTRAINT "character_rulebookName_fkey" FOREIGN KEY ("rulebookName") REFERENCES "rulebook"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
