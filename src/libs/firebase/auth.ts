// libs/firebase/auth.ts

import {
  type User,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
  getAuth,
} from "firebase/auth";

import { firebaseApp } from "./config";

export function onAuthStateChanged(callback: (authUser: User | null) => void) {
  return _onAuthStateChanged(getAuth(firebaseApp), callback);
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(getAuth(firebaseApp), provider);

    if (!result || !result.user) {
      throw new Error("Google sign in failed");
    }
    return result.user.uid;
  } catch (error) {
    console.error("Error signing in with Google", error);
  }
}

export async function signOutWithGoogle() {
  try {
    await getAuth(firebaseApp).signOut();
  } catch (error) {
    console.error("Error signing out with Google", error);
  }
}
