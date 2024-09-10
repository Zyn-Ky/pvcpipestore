import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useTranslations } from "next-intl";
interface UpdateDisplaynameModuleProps {
  onClose: () => void;
  open: boolean;
}
export default function UpdateDisplaynameModule({
  onClose,
  open,
}: UpdateDisplaynameModuleProps) {
  const t = useTranslations("ACCOUNT_MANAGER");
  function onCloseHandler() {
    onClose();
  }
  return (
    <>
      <Dialog open={open} onClose={() => onCloseHandler()}>
        <DialogTitle>{t("EDIT_DISPLAY_NAME_TEXT")}</DialogTitle>
        <DialogContent className="min-w-80"></DialogContent>
        <DialogActions>
          <Button onClick={onCloseHandler}>{t("EDITOR_CANCEL")}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
