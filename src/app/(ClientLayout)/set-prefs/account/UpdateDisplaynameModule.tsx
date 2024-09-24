import { useGeneralFunction } from "@/components/base/GeneralWrapper";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Slide,
  TextField,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { enqueueSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
interface UpdateDisplaynameModuleProps {
  onClose: () => void;
  open: boolean;
}
export default function UpdateDisplaynameModule({
  onClose,
  open,
}: UpdateDisplaynameModuleProps) {
  const t = useTranslations("ACCOUNT_MANAGER");
  const [newInput, setNewInput] = useState("");
  const container = useRef<HTMLDivElement | null>(null);
  const inputText = useRef<HTMLInputElement | null>(null);
  const { userManager } = useGeneralFunction();
  function onCloseHandler() {
    onClose();
    setNewInput("");
  }
  const isInputEmpty = newInput.length === 0;
  async function UpdateDisplayName() {
    if (!userManager.currentUser || newInput.length === 0) return;
    await userManager.method.UpdateInfo({ displayName: newInput });
    enqueueSnackbar(t("REQUIRED_TO_REFRESH"));
    onCloseHandler();
  }
  return (
    <>
      <Dialog
        open={open}
        onAnimationStart={() => {
          if (open) inputText.current && inputText.current.focus();
        }}
        onClose={() => onCloseHandler()}
        autoFocus
      >
        <FormControl
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            UpdateDisplayName();
          }}
        >
          <DialogTitle>{t("EDIT_DISPLAY_NAME_TEXT")}</DialogTitle>
          <DialogContent className="min-w-80">
            <TextField
              autoFocus
              autoCapitalize="on"
              autoComplete="on"
              autoCorrect="on"
              fullWidth
              label={t("DISPLAY_NAME_TEXT")}
              type="text"
              name="displayname"
              value={newInput}
              inputRef={inputText}
              onChange={(e) => {
                setNewInput(e.target.value);
              }}
              className="my-2"
            />
          </DialogContent>
          <DialogActions ref={container} className="overflow-hidden">
            <Slide
              direction="up"
              in={!isInputEmpty}
              container={container.current}
            >
              <Button type="submit">{t("EDITOR_SAVE")}</Button>
            </Slide>
            <Button type="reset" onClick={onCloseHandler}>
              {t("EDITOR_CANCEL")}
            </Button>
          </DialogActions>
        </FormControl>
      </Dialog>
    </>
  );
}
