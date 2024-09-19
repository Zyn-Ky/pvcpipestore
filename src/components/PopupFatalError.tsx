import { Box, Modal, Typography } from "@mui/material";

export default function PopupFatalError({
  hiddenMessage,
  title,
  description,
}: {
  title?: string;
  description?: string;
  hiddenMessage: string;
}) {
  return (
    <Modal
      disablePortal
      disableEnforceFocus
      disableAutoFocus
      open
      className="p-4 flex items-center justify-center "
    >
      <Box className="relative w-[400px] bg-black overflow-auto text-white border-2 border-solid border-black shadow-black p-4">
        <Typography id="server-modal-title" variant="h6" component="h2">
          {title ?? "An fatal error has been occurred"}
        </Typography>
        <Typography id="server-modal-description" className="pt-2">
          {!description && (
            <details>
              <summary>View log</summary>
              {hiddenMessage}
            </details>
          )}
        </Typography>
      </Box>
    </Modal>
  );
}
