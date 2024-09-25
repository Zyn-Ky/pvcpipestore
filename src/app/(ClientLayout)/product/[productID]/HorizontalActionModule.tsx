"use client";
import CSS from "@/scss/ProductItem.module.scss";
import { CircularProgress, Fade, IconButton, Tooltip } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FlagIcon from "@mui/icons-material/Flag";
import DifferenceIcon from "@mui/icons-material/Difference";
import ProtectedHiddenDevelopmentComponent, {
  IsDisabledOnProduction,
} from "@/components/base/ProtectedHiddenDevComponent";
import { useProductActions } from "@/components/hooks/productManager";
import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
export default function HorizontalActionModule({
  productID,
}: {
  productID: string;
}) {
  const { triggerLike, likeButtonLoading } = useProductActions(productID);
  const [fakeIsLiked, setIsLiked] = useState(false);
  return (
    <>
      <div className={CSS.Actions}>
        <Tooltip title="Suka">
          <IconButton
            disabled={likeButtonLoading}
            onClick={() => {
              if (!likeButtonLoading) {
                triggerLike();
                setIsLiked((prev) => !prev);
              }
            }}
          >
            {likeButtonLoading && <CircularProgress size="1.5rem" />}
            {!likeButtonLoading && !fakeIsLiked && (
              <FavoriteBorderOutlinedIcon />
            )}
            {!likeButtonLoading && fakeIsLiked && <FavoriteIcon />}
          </IconButton>
        </Tooltip>
        <ProtectedHiddenDevelopmentComponent>
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
        </ProtectedHiddenDevelopmentComponent>
      </div>
    </>
  );
}
