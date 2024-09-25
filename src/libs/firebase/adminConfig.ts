import * as admin from "firebase-admin";
import { App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getMessaging } from "firebase-admin/messaging";
import { getStorage } from "firebase-admin/storage";
import { getRemoteConfig } from "firebase-admin/remote-config";
import { getAuth } from "firebase-admin/auth";

const AdminFirebaseApp =
  admin.apps.length === 0
    ? admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.SECURED_FIREBASE_ADMIN_CERT_PROJECT_ID,
          clientEmail: process.env.SECURED_FIREBASE_ADMIN_CERT_CLIENT_EMAIL,
          privateKey:
            process.env.SECURED_FIREBASE_ADMIN_CERT_PRIVATE_KEY?.replace(
              /\\n/g,
              "\n"
            ),
        }),
      })
    : (admin.apps[0] as admin.app.App);

export const AdminFirebaseMessaging = getMessaging(AdminFirebaseApp);
export const AdminFirebaseStore = getFirestore(AdminFirebaseApp);
export const AdminFirebaseStorage = getStorage(AdminFirebaseApp);
export const AdminFirebaseRemoteConfig = getRemoteConfig(AdminFirebaseApp);
export const AdminFirebaseAuth = getAuth(AdminFirebaseApp);

export default AdminFirebaseApp as App;
