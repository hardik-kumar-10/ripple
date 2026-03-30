/*
  Warnings:

  - The values [ADVERTISEMENT] on the enum `VoiceCategory` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "VoiceCategory_new" AS ENUM ('AUDIOBOOK', 'CONVERSATIONAL', 'CUSTOMER_SERVICE', 'GENERAL', 'NARRATIVE', 'CHARACTERS', 'MEDITATION', 'MOTIVATION', 'PODCAST', 'ADVERTISING', 'VOICEOVER', 'CORPORATE');
ALTER TABLE "public"."Voice" ALTER COLUMN "category" DROP DEFAULT;
ALTER TABLE "Voice" ALTER COLUMN "category" TYPE "VoiceCategory_new" USING ("category"::text::"VoiceCategory_new");
ALTER TYPE "VoiceCategory" RENAME TO "VoiceCategory_old";
ALTER TYPE "VoiceCategory_new" RENAME TO "VoiceCategory";
DROP TYPE "public"."VoiceCategory_old";
ALTER TABLE "Voice" ALTER COLUMN "category" SET DEFAULT 'GENERAL';
COMMIT;

-- AlterTable
ALTER TABLE "Voice" ALTER COLUMN "language" SET DEFAULT 'en-US',
ALTER COLUMN "orgId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Generation" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "voiceId" TEXT,
    "text" TEXT NOT NULL,
    "voiceName" TEXT NOT NULL,
    "r2ObjectKey" TEXT,
    "temperature" DOUBLE PRECISION NOT NULL,
    "topP" DOUBLE PRECISION NOT NULL,
    "topK" INTEGER NOT NULL,
    "repetitionPenalty" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Generation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Generation_orgId_idx" ON "Generation"("orgId");

-- CreateIndex
CREATE INDEX "Generation_voiceId_idx" ON "Generation"("voiceId");

-- AddForeignKey
ALTER TABLE "Generation" ADD CONSTRAINT "Generation_voiceId_fkey" FOREIGN KEY ("voiceId") REFERENCES "Voice"("id") ON DELETE SET NULL ON UPDATE CASCADE;
