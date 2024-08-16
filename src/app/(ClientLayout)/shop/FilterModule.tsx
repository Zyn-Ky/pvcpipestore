"use client";
import {
  Box,
  Button,
  Chip,
  Collapse,
  Divider,
  IconButton,
  Popover,
  Stack,
  styled,
  SwipeableDrawer,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ComponentProps, memo, useMemo, useState } from "react";
import TuneIcon from "@mui/icons-material/Tune";
import CloseIcon from "@mui/icons-material/Close";
import { CategoryItem } from "@/libs/config";
import Link from "next/link";
import paths, { GenerateShopFilterUrl } from "@/components/paths";

type PopoverProps = ComponentProps<typeof Popover>;

type AdvancedFilterPopUpProps = {
  filterData: {
    [key: string]: CategoryItem[];
  };
  activeFilterID: number[] | undefined;
};
const Puller = styled("div")(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.grey[300]
      : theme.palette.grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

const ChipStack = styled(Stack)(({ theme }) => ({
  marginBottom: "1rem",
  overflowX: "auto",
  maxWidth: "100%",
}));

export default memo(function AdvancedFilterModule({
  filterData,
  activeFilterID,
}: AdvancedFilterPopUpProps) {
  const theme = useTheme();
  const [popupAnchor, setPopupAnchor] = useState<HTMLButtonElement | null>(
    null
  );
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isBiggerScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const isOpened = Boolean(popupAnchor);

  function Child() {
    return (
      <>
        <Typography variant="body1" gutterBottom>
          Jenis Produk
        </Typography>
        {activeFilterID && activeFilterID.length > 0 && (
          <Button
            LinkComponent={Link}
            href={paths.ACTUAL_SHOP}
            sx={{ mb: 1 }}
            variant="outlined"
          >
            Hapus filter
          </Button>
        )}
        <ChipStack direction="row" spacing={1}>
          <Chip label="MISSING" variant="outlined" onClick={() => {}} />
          <Chip label="?" variant="outlined" onClick={() => {}} />
        </ChipStack>
        <Typography variant="body1" gutterBottom>
          Jenis Standar Pipa
        </Typography>
        <ChipStack direction="row" spacing={1}>
          {filterData.FilterByStandard &&
            filterData.FilterByStandard.map((category) =>
              activeFilterID &&
              activeFilterID.filter((id) => id === category.SelfID).length ===
                0 ? (
                <Chip
                  key={`CATEGORY_${category.SelfID}`}
                  label={category.Title}
                  variant={
                    activeFilterID &&
                    activeFilterID.filter((id) => id === category.SelfID)
                      .length >= 1
                      ? "filled"
                      : "outlined"
                  }
                />
              ) : (
                <Chip
                  key={`CATEGORY_${category.SelfID}`}
                  label={category.Title}
                  href={GenerateShopFilterUrl({ filterID: [category.SelfID] })}
                  component={Link}
                  variant={
                    activeFilterID &&
                    activeFilterID.filter((id) => id === category.SelfID)
                      .length >= 1
                      ? "filled"
                      : "outlined"
                  }
                  clickable={
                    activeFilterID &&
                    activeFilterID.filter((id) => id === category.SelfID)
                      .length === 0
                  }
                />
              )
            )}
        </ChipStack>
        <Typography variant="body1" gutterBottom>
          Urutkan
        </Typography>
        <ChipStack direction="row" spacing={1}>
          <Chip label="Harga Terendah" variant="outlined" onClick={() => {}} />
          <Chip label="Harga Tertinggi" variant="outlined" onClick={() => {}} />
          <Chip label="Terlaris" variant="outlined" onClick={() => {}} />
          <Chip label="Gratis Ongkir" variant="outlined" onClick={() => {}} />
        </ChipStack>
      </>
    );
  }
  function CloseModal() {
    setPopupAnchor(null);
  }
  return (
    <>
      <Button
        color="primary"
        startIcon={<TuneIcon />}
        onClick={(el) => {
          setPopupAnchor(isOpened ? null : el.currentTarget);
        }}
      >
        Filter
      </Button>
      <Collapse
        in={isBiggerScreen && isOpened}
        unmountOnExit
        mountOnEnter
        sx={{ mt: 1 }}
      >
        <Typography variant="h5">Filter</Typography>
        <Divider sx={{ my: 1 }} />
        <Child />
      </Collapse>
      <Popover
        open={!isSmallScreen && !isBiggerScreen && isOpened}
        anchorEl={popupAnchor}
        onClose={CloseModal}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        slotProps={{ paper: { sx: { p: 2, width: 400 } } }}
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
        <Child />
      </Popover>
      <SwipeableDrawer
        anchor="bottom"
        open={isSmallScreen && isOpened}
        onClose={CloseModal}
        onOpen={() => {}}
        disableSwipeToOpen
        PaperProps={{ sx: { borderRadius: "24px 24px 0 0" } }}
      >
        <Puller />
        <Stack
          direction="row"
          spacing={1}
          my={1}
          mt={2}
          px={2}
          alignItems="center"
        >
          <Typography variant="h5" flex={1}>
            Filter
          </Typography>
          <IconButton onClick={() => setPopupAnchor(null)}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Divider sx={{ mb: 1 }} />
        <Box sx={{ px: 2 }}>
          <Child />
        </Box>
      </SwipeableDrawer>
    </>
  );
});
