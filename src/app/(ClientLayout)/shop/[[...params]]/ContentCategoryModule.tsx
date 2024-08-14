import CSS from "@/scss/ShopPage.module.scss";
import { InfoRounded } from "@mui/icons-material";
import { Typography } from "@mui/material";
import HighlightedButton from "./CustomHighlightedButton";

export default function ContentCategoryModule() {
  return (
    <>
      <Typography variant="h3" fontWeight="bold">
        Kategori
      </Typography>
      <div className={CSS.HeaderCategoryList}>
        <div className={CSS.HorizontalCategory}>
          <HighlightedButton className={CSS.CategoryItem}>
            <div className={CSS.CategoryItemIcon}>
              <InfoRounded />
            </div>
            <Typography>Fitting Pipa PVC Standard JIS</Typography>
          </HighlightedButton>
          <div className={CSS.CategoryItem}>Test</div>
          <div className={CSS.CategoryItem}>Test</div>
          <div className={CSS.CategoryItem}>Test</div>
          <div className={CSS.CategoryItem}>Test</div>
          <div className={CSS.CategoryItem}>Test</div>
        </div>
      </div>
    </>
  );
}
