"use client";
import CSS from "@/scss/ProductItem.module.scss";
import { IconButton, Tooltip } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FlagIcon from "@mui/icons-material/Flag";
import DifferenceIcon from "@mui/icons-material/Difference";
export default function HorizontalActionModule() {
  return (
    <>
      <div className={CSS.Actions}>
        <Tooltip title="Saya suka">
          <IconButton>
            <FavoriteBorderOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Laporkan">
          <IconButton>
            <FlagIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Bandingkan">
          <IconButton>
            <DifferenceIcon />
          </IconButton>
        </Tooltip>
      </div>
    </>
  );
}
