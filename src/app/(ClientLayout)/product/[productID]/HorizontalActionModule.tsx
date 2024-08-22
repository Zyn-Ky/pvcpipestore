"use client";
import CSS from "@/scss/ProductItem.module.scss";
import { IconButton, Tooltip } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FlagIcon from "@mui/icons-material/Flag";
import DifferenceIcon from "@mui/icons-material/Difference";
import { IsDisabledOnProduction } from "@/components/base/ProtectedHiddenDevComponent";
export default function HorizontalActionModule() {
  return (
    <>
      <div className={CSS.Actions}>
        <Tooltip title="Saya suka">
          <IconButton disabled={IsDisabledOnProduction()}>
            <FavoriteBorderOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Laporkan">
          <IconButton disabled={IsDisabledOnProduction()}>
            <FlagIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Bandingkan">
          <IconButton disabled={IsDisabledOnProduction()}>
            <DifferenceIcon />
          </IconButton>
        </Tooltip>
      </div>
    </>
  );
}
