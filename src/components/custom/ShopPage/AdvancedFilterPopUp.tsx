"use client";
import {
  Button,
  Chip,
  Divider,
  IconButton,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import { ComponentProps, useRef, useState } from "react";
import TuneIcon from "@mui/icons-material/Tune";
import CloseIcon from "@mui/icons-material/Close";

type PopoverProps = ComponentProps<typeof Popover>;

type AdvancedFilterPopUpProps = {
  show: PopoverProps["open"];
  anchorEl: PopoverProps["anchorEl"];
  onClose: PopoverProps["onClose"];
};

export default function AdvancedFilterPopUp() {
  const [popupAnchor, setPopupAnchor] = useState<HTMLButtonElement | null>(
    null
  );
  return (
    <>
      <Button
        color="primary"
        startIcon={<TuneIcon />}
        onClick={(el) => {
          setPopupAnchor(el.currentTarget);
        }}
      >
        Filter
      </Button>
      <Popover
        open={Boolean(popupAnchor)}
        anchorEl={popupAnchor}
        onClose={() => setPopupAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        slotProps={{ paper: { sx: { p: 2, minWidth: 400 } } }}
      >
        <Stack direction="row" spacing={1} mb={1} alignItems="center">
          <Typography variant="h5" flex={1}>
            Filter
          </Typography>
          <IconButton onClick={() => setPopupAnchor(null)}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Divider sx={{ mb: 1 }} />
        <Typography variant="body1" gutterBottom>
          Jenis Produk
        </Typography>
        <Stack direction="row" spacing={1} mb={1}>
          <Chip label="Pipa uPVC" variant="outlined" onClick={() => {}} />
          <Chip
            label="Fitting & Aksesoris Pipa PVC"
            variant="outlined"
            onClick={() => {}}
          />
        </Stack>
        <Typography variant="body1" gutterBottom>
          Jenis Pipa
        </Typography>
        <Stack direction="row" spacing={1} mb={1}>
          <Chip label="SNI" variant="outlined" onClick={() => {}} />
          <Chip label="JIS" variant="outlined" onClick={() => {}} />
          <Chip label="PP-R" variant="outlined" onClick={() => {}} />
        </Stack>
        <Typography variant="body1" gutterBottom>
          Urutkan
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          mb={1}
          maxWidth={400}
          overflow="auto"
        >
          <Chip label="Harga Terendah" variant="outlined" onClick={() => {}} />
          <Chip label="Harga Tertinggi" variant="outlined" onClick={() => {}} />
          <Chip label="Terlaris" variant="outlined" onClick={() => {}} />
          <Chip label="Gratis Ongkir" variant="outlined" onClick={() => {}} />
        </Stack>
      </Popover>
    </>
  );
}
