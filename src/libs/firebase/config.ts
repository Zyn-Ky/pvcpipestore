// libs/firebase/config.ts

import { getAuth } from "firebase/auth";
import { initializeApp, getApps, FirebaseOptions } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getInstallations } from "firebase/installations";
import { getRemoteConfig } from "firebase/remote-config";
import { getDatabase } from "firebase/database";
import { getMessaging, isSupported } from "firebase/messaging";
import { getAnalytics } from "firebase/analytics";
import { getPerformance } from "firebase/performance";
import { getFunctions } from "firebase/functions";

export const isWindowEnv =
  typeof window !== "undefined" || typeof global.window !== "undefined";

// Load .env variables
const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
