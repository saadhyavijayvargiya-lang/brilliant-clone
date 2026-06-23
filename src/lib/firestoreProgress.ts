import { User } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import type { AppProgress } from "../types/content";

const APP_PROGRESS_DOC = "app";

export async function loadRemoteProgress(
  user: User
): Promise<AppProgress | null> {
  const ref = doc(db, "users", user.uid, "progress", APP_PROGRESS_DOC);
  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) return null;
  return snapshot.data() as AppProgress;
}

export async function saveRemoteProgress(
  user: User,
  progress: AppProgress
): Promise<void> {
  await ensureUserProfile(user);
  await setDoc(
    doc(db, "users", user.uid, "progress", APP_PROGRESS_DOC),
    progress,
    { merge: true }
  );
}

export async function ensureUserProfile(user: User): Promise<void> {
  await setDoc(
    doc(db, "users", user.uid),
    {
      displayName: user.displayName ?? user.email ?? "Learner",
      email: user.email ?? null,
      photoURL: user.photoURL ?? null,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}
