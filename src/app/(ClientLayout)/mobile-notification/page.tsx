"use client";
import NotificationList from "@/components/base/NotificationList";
import { useFCMNotification } from "@/components/base/NotificationManager";
import { ClearAll } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

export default function MobileNotification() {
  const { clearAll, Notifications } = useFCMNotification();
  const t = useTranslations("NOTIFICATION_MANAGER");
  return (
    <>
      <div className="flex flex-col pt-4 px-4">
        <Typography fontWeight="700" variant="h4">
          {t("TITLE_TEXT")}
        </Typography>
        <div className="flex gap-4 mt-2">
          {Notifications && Notifications.length > 0 && (
            <IconButton onClick={() => clearAll()}>
              <ClearAll />
            </IconButton>
          )}
        </div>
      </div>
      <NotificationList />
    </>
  );
}
