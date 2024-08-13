import { getRemoteConfig } from "firebase-admin/remote-config";
import AdminFirebaseApp from "./adminConfig";

export default async function IsComingSoonSSR() {
  if (!AdminFirebaseApp) return false;
  const isDevelopmentMode = process.env.NODE_ENV === "development";
  const rc = getRemoteConfig(AdminFirebaseApp);
  const template = rc.initServerTemplate({
    defaultConfig: { COMING_SOON_MODE: false },
  });
  await template.load();
  const serverConfig = template.evaluate();
  return !isDevelopmentMode && serverConfig.getBoolean("COMING_SOON_MODE");
}
