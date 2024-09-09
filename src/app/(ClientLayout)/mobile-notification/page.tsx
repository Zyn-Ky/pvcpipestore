import NotificationList from "@/components/base/NotificationList";
import SITE_CONFIG from "@/components/config";
import { Typography } from "@mui/material";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: `Notifikasi`,
};

export default function MobileNotification() {
  return (
    <>
      <div className="flex p-4 mb-2">
        <Typography fontWeight="700" variant="h4">
          Notifikasi
        </Typography>
      </div>
      <NotificationList />
    </>
  );
}
