import type { app } from "firebase-admin";
import AdminFirebaseApp from "../firebase/adminConfig";
import { getAuth } from "firebase-admin/auth";

const EXPECTED_FB_TOKEN_AUD =
  process.env.SECURED_FIREBASE_ADMIN_CERT_PROJECT_ID ?? "INVALID";
const EXPECTED_FB_TOKEN_ISS = `https://securetoken.google.com/${
  process.env.SECURED_FIREBASE_ADMIN_CERT_PROJECT_ID ?? "INVALID"
}`;
export default async function UserVerifyID(expToken: string) {
  const Auth = getAuth(AdminFirebaseApp);
  try {
    const CurrentUnixEpoch = Math.floor(new Date().getTime() / 1000);
    const ReturnCode = await Auth.verifyIdToken(expToken);
    const UserExists = await Auth.getUser(ReturnCode.uid);
    const IsValid =
      ReturnCode.exp >= CurrentUnixEpoch && ReturnCode.iat <= CurrentUnixEpoch;
    return { UserExists: Boolean(UserExists), IsValid, uid: ReturnCode.uid };
  } catch (e) {
    return {
      UserExists: false,
      IsValid: false,
      uid: "-1",
    };
  }
}
