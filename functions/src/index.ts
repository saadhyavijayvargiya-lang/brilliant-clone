import { setGlobalOptions } from "firebase-functions/v2";
import { onCall } from "firebase-functions/v2/https";
import { initializeApp } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

initializeApp();
setGlobalOptions({ maxInstances: 10, region: "us-central1" });

export const ping = onCall(async () => {
  return { ok: true, project: "brilliant-clone-5c11e" };
});

export const onUserCreate = onCall(async (request) => {
  if (!request.auth) {
    throw new Error("Unauthenticated");
  }
  const uid = request.auth.uid;
  const db = getFirestore();
  const ref = db.collection("users").doc(uid);
  const snap = await ref.get();
  if (!snap.exists) {
    await ref.set({
      displayName: request.auth.token.name ?? request.auth.token.email ?? "Learner",
      email: request.auth.token.email ?? null,
      createdAt: FieldValue.serverTimestamp(),
      streakCount: 0,
      longestStreak: 0,
      lastActiveDate: null,
      lessonsCompleted: 0,
      milestones: [],
    });
  }
  return { ok: true };
});
