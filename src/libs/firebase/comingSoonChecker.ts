import AdminFirebaseApp, { AdminFirebaseRemoteConfig } from "./adminConfig";

export default async function IsComingSoonSSR() {
  if (!AdminFirebaseApp) return false;
  const isDevelopmentMode = process.env.NODE_ENV === "development";
  const template = AdminFirebaseRemoteConfig.initServerTemplate({
    defaultConfig: { COMING_SOON_MODE: false },
  });
  await template.load();
  const serverConfig = template.evaluate();
  return !isDevelopmentMode && serverConfig.getBoolean("COMING_SOON_MODE");
}
