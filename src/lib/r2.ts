// src/lib/r2.ts
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import { env } from "./env";

if (!getApps().length) {
    initializeApp({
        credential: cert({
            projectId: env.FIREBASE_PROJECT_ID,
            clientEmail: env.FIREBASE_CLIENT_EMAIL,
            privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        }),
        storageBucket: env.FIREBASE_STORAGE_BUCKET,
    });
}

const bucket = getStorage().bucket();

type UploadAudioOptions = {
    buffer: Buffer;
    key: string;
    contentType?: string;
};

export async function uploadAudio({
    buffer,
    key,
    contentType = "audio/wav",
}: UploadAudioOptions): Promise<void> {
    const file = bucket.file(key);
    await file.save(buffer, {
        metadata: { contentType },
    });
}

export async function deleteAudio(key: string): Promise<void> {
    await bucket.file(key).delete();
}

export async function getSignedAudioUrl(key: string): Promise<string> {
    const [url] = await bucket.file(key).getSignedUrl({
        action: "read",
        expires: Date.now() + 60 * 60 * 1000, // 1 hour
    });
    return url;
}