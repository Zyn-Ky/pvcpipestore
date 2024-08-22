import { getAuth } from "firebase-admin/auth";
import AdminFirebaseApp from "../firebase/adminConfig";
import { ADMIN_APPROVED_SELLER_USER_ROLE } from "../config";

export default async function IsActiveSeller(authToken: string) {
  if (!authToken) return;
  const { verifyIdToken, getUser } = getAuth(AdminFirebaseApp);
  try {
    const { uid } = await verifyIdToken(authToken);
    const currentUser = await getUser(uid);
    if (!currentUser || currentUser.disabled || !currentUser.emailVerified)
      return {
        uid: "",
        active: false,
      };
    console.log(currentUser.customClaims);
    return {
      uid,
      active:
        currentUser.customClaims?.userRole == ADMIN_APPROVED_SELLER_USER_ROLE,
    };
  } catch {
    return { uid: "", active: false };
  }
}
