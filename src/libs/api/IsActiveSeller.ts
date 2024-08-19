import { getAuth } from "firebase-admin/auth";
import AdminFirebaseApp from "../firebase/adminConfig";

export default async function IsActiveSeller(authToken: string) {
  if (!authToken) return;
  const { verifyIdToken, getUser } = getAuth(AdminFirebaseApp);
  try {
    const { uid } = await verifyIdToken(authToken);
    const currentUser = await getUser(uid);
    if (currentUser.disabled || !currentUser.emailVerified) return false;
    currentUser.customClaims;
  } catch {
    return false;
  }
}
