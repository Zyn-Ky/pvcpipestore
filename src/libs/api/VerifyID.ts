import type { app } from "firebase-admin";
const EXPECTED_FB_TOKEN_AUD =
  process.env.SECURED_FIREBASE_ADMIN_CERT_PROJECT_ID ?? "INVALID";
const EXPECTED_FB_TOKEN_ISS = `https://securetoken.google.com/${
  process.env.SECURED_FIREBASE_ADMIN_CERT_PROJECT_ID ?? "INVALID"
}`;
export default async function UserVerifyID(
  AdminFirebaseApp: app.App,
  expToken: string
) {
  const CurrentUnixEpoch = Math.floor(new Date().getTime() / 1000);
  const Auth = AdminFirebaseApp?.auth();
  const ReturnCode = await Auth.verifyIdToken(expToken);
  const UserExists = await AdminFirebaseApp?.auth().getUser(ReturnCode.uid);
  const IsValid =
    ReturnCode.aud === EXPECTED_FB_TOKEN_AUD &&
    ReturnCode.iss === EXPECTED_FB_TOKEN_ISS &&
    ReturnCode.exp >= CurrentUnixEpoch &&
    ReturnCode.iat <= CurrentUnixEpoch;
  return { UserExists, IsValid };
}
