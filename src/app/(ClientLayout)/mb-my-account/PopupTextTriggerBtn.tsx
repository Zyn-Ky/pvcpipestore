"use client";

import { GenerateTosPage } from "@/components/paths";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ReactNode, useState } from "react";

export default function PopupTextTriggerBtn({
  icon,
  text,
  iframeURL,
}: {
  icon?: ReactNode;
  text?: ReactNode;
  iframeURL: string;
}) {
  const theme = useTheme();
  const isSmallerSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isBiggerScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [isOpened, setIsOpened] = useState(false);
  const [iframeHeight, setIframeHeight] = useState(0);
  return (
    <>
      <ListItemButton onClick={() => setIsOpened(true)}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText primary={text ?? <></>} />
      </ListItemButton>
      <Dialog
        fullScreen={isSmallerSmallScreen}
        open={isOpened}
        onClose={() => setIsOpened(false)}
        PaperProps={{
          className: `${
            isSmallerSmallScreen ? "min-w-[0px]" : "min-w-[600px]"
          } min-h-[500px]`,
        }}
      >
        <DialogContent dividers className="p-0">
          <iframe
            src={iframeURL ?? ""}
            style={{ height: iframeHeight }}
            className="w-full h-auto min-h-full m-0 p-0 border-none"
            onLoad={(e) => {
              const iframeWindow = e.currentTarget.contentWindow;
              if (!iframeWindow) return;
              setIframeHeight(iframeWindow.document.body.scrollHeight + 45);
            }}
            scrolling="no"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setIsOpened(false);
            }}
          >
            Tutup
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
