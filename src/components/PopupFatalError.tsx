import { Box, DialogActions, Modal, Typography } from "@mui/material";
import { ReactNode } from "react";
import ReportButton from "./base/ReportButton";

export default function PopupFatalError({
  hiddenMessage,
  title,
  description,
  showLog,
  action,
  reportButton,
}: {
  title?: string;
  description?: string;
  showLog?: boolean;
  hiddenMessage: string;
  action?: ReactNode;
  reportButton?: boolean;
}) {
  return (
    <Modal
      disablePortal
      disableEnforceFocus
      disableAutoFocus
      open
      className="p-4 flex items-center justify-center backdrop-blur-md  backdrop-invert"
    >
      <Box className="relative w-[400px] rounded-2xl bg-black overflow-auto text-white border-2 border-solid border-white shadow-black p-4">
        <Typography id="server-modal-title" variant="h6" component="h2">
          {title ?? "A fatal error has been occurred"}
        </Typography>
        <Typography id="server-modal-description" className="pt-2">
          {(!description || showLog) && (
            <details>
              <summary>View log</summary>
              <pre className="whitespace-break-spaces max-h-[50vh] overflow-auto select-text">
                {hiddenMessage}
              </pre>
            </details>
          )}
          {description && description}
          {action && (
            <DialogActions className="mt-4">
              {action}{" "}
              {reportButton && <ReportButton errorMessage={hiddenMessage} />}
            </DialogActions>
          )}
        </Typography>
      </Box>
    </Modal>
  );
}
