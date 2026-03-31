import type { Metadata } from "next";
import { Suspense } from "react";
import { TextToSpeechView } from "@/features/text-to-speech/views/text-to-speech-view";
import { trpc, HydrateClient, prefetch } from "@/trpc/server";

export const metadata: Metadata = { title: "Text to Speech" };

export default async function TextToSpeechPage() {
    // Prefetch voices on the server to avoid fetch errors during SSR
    void prefetch(trpc.voices.getAll.queryOptions());

    return (
        <HydrateClient>
            <Suspense fallback={<div className="flex h-full items-center justify-center font-medium text-muted-foreground animate-pulse">Loading experience...</div>}>
                <TextToSpeechView />
            </Suspense>
        </HydrateClient>
    );
}