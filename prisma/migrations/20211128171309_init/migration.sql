-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "createdOn" TIMESTAMP(6) NOT NULL,
    "lastModifiedOn" TIMESTAMP(6) NOT NULL,
    "authId" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rulebook" (
    "id" SERIAL NOT NULL,
    "createdOn" TIMESTAMP(6) NOT NULL,
    "lastModifiedOn" TIMESTAMP(6) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "rulebook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "character" (
    "id" SERIAL NOT NULL,
    "createdOn" TIMESTAMP(6) NOT NULL,
    "lastModifiedOn" TIMESTAMP(6) NOT NULL,
    "name" TEXT NOT NULL,
    "characterCode" TEXT NOT NULL,
    "playerId" INTEGER NOT NULL,

    CONSTRAINT "character_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_authId_key" ON "user"("authId");

-- AddForeignKey
ALTER TABLE "character" ADD CONSTRAINT "character_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
