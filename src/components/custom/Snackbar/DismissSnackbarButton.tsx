import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { SnackbarKey, useSnackbar } from "notistack";

export default function DismissSnackbarButton({
  snackbarKey,
}: {
  snackbarKey: SnackbarKey;
}) {
  const { closeSnackbar } = useSnackbar();

  return (
    <IconButton onClick={() => closeSnackbar(snackbarKey)}>
      <CloseIcon />
    </IconButton>
  );
}
