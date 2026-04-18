import type { VoiceCategory } from "@/generated/prisma/client";

export const VOICE_CATEGORY_LABELS: Record<VoiceCategory, string> = {
    AUDIOBOOK: "Audiobook",
    CONVERSATIONAL: "Conversational",
    CUSTOMER_SERVICE: "Customer Service",
    GENERAL: "General",
    NARRATIVE: "Narrative",
    CHARACTERS: "Characters",
    MEDITATION: "Meditation",
    MOTIVATION: "Motivation",
    PODCAST: "Podcast",
    ADVERTISE: "Advertise",
    VOICEOVER: "Voiceover",
    CORPORATE: "Corporate",
};

export const VOICE_CATEGORIES = Object.keys(
    VOICE_CATEGORY_LABELS,
) as VoiceCategory[];