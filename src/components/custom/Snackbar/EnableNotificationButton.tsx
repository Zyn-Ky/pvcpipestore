import { Button } from "@mui/material";
import { SnackbarKey, useSnackbar } from "notistack";
import DismissSnackbarButton from "./DismissSnackbarButton";
import { useFCMNotification } from "@/components/base/NotificationManager";

function EnableNotificationSnackbarButtonImpl({
  snackbarKey,
}: {
  snackbarKey: SnackbarKey;
}) {
  const { requestPermission } = useFCMNotification();
  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        className="mr-2"
        onClick={() => requestPermission()}
      >
        Nyalakan
      </Button>
      <DismissSnackbarButton snackbarKey={snackbarKey} />
    </>
  );
}

export default function EnableNotificationSnackbarButton(
  snackbarKey: SnackbarKey
) {
  return <EnableNotificationSnackbarButtonImpl snackbarKey={snackbarKey} />;
}
