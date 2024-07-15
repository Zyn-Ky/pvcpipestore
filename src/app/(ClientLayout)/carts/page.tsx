import { Box, Paper, styled, Typography } from "@mui/material";
import styles from "@/scss/custom/CartList.module.scss";
export default function CartsItemList() {
  return (
    <>
      <div className={styles.WrapperList}>
        <div className={styles.ItemListing}>
          <Typography>No items</Typography>
        </div>
        <Paper className={styles.FloatingPay}>
          <Typography variant="h5" fontWeight={700}>
            Summary
          </Typography>
        </Paper>
      </div>
    </>
  );
}
