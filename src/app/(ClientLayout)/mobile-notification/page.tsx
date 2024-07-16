import NotificationList from "@/components/base/NotificationList";
import SITE_CONFIG from "@/components/config";
import { Typography } from "@mui/material";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: `Notifikasi - ${SITE_CONFIG.SEO.Title}`,
};

export default function MobileNotification() {
  return (
    <>
      <Typography fontWeight="700" variant="h4" gutterBottom>
        Notifications
      </Typography>
      <NotificationList />
    </>
  );
}
