import NotificationList from "@/components/base/NotificationList";
import { Typography } from "@mui/material";

export default function AdminPage() {
  return (
    <>
      <Typography fontWeight="700" variant="h4" gutterBottom>
        Notifications
      </Typography>
      <NotificationList />
    </>
  );
}
