-- CreateEnum
CREATE TYPE "VoiceVariant" AS ENUM ('SYSTEM', 'CUSTOM');

-- CreateEnum
CREATE TYPE "VoiceCategory" AS ENUM ('AUDIOBOOK', 'CONVERSATIONAL', 'NARRATIVE', 'VOICEOVER', 'ADVERTISEMENT', 'CUSTOMER_SERVICE', 'MEDITATION', 'CHARACTERS', 'MOTIVATION', 'CORPORATE', 'PODCAST', 'GENERAL');

-- CreateTable
CREATE TABLE "Voice" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "category" "VoiceCategory" NOT NULL DEFAULT 'GENERAL',
    "language" TEXT NOT NULL DEFAULT 'en-us',
    "variant" "VoiceVariant" NOT NULL,
    "r2ObjectKey" TEXT,
    "orgId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Voice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Voice_variant_idx" ON "Voice"("variant");

-- CreateIndex
CREATE INDEX "Voice_orgId_idx" ON "Voice"("orgId");
