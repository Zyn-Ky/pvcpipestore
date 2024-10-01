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
import { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { ProductCardInfo } from "@/libs/config";
import { useGeneralFunction } from "@/components/base/GeneralWrapper";
import { useLogger } from "@/components/hooks/logger";
export default function HorizontalActionModule({
  productData,
}: {
  productData: ProductCardInfo;
}) {
  const { triggerLike, likeButtonLoading } = useProductActions(
    productData.ProductID
  );
  const [fakeIsLiked, setIsLiked] = useState(false);
  const { userManager } = useGeneralFunction();
  const { Console } = useLogger();
  useEffect(() => {
    if (userManager.currentUser && productData.LikedByUID) {
      setIsLiked(productData.LikedByUID.includes(userManager.currentUser.uid));
    }
  }, [userManager.currentUser, productData, productData.LikedByUID]);

  return (
    <>
      <div className={CSS.Actions}>
        <Tooltip title="Suka">
          <IconButton
            disabled={likeButtonLoading}
            onClick={async () => {
              if (!likeButtonLoading) {
                setIsLiked(await triggerLike(!fakeIsLiked));
                Console("log", "fakeIsLiked", fakeIsLiked);
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
