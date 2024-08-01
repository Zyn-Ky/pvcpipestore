import * as admin from "firebase-admin";
import { App } from "firebase-admin/app";

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
    : admin.apps[0];

export default AdminFirebaseApp as App;
