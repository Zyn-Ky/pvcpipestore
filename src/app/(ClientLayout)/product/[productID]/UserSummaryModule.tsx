"use client";
import CSS from "@/scss/ProductItem.module.scss";
import { ProductCardInfo } from "@/libs/config";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Paper,
  Portal,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function UserSummaryModule({
  userInfo,
}: {
  userInfo: ProductCardInfo["ResolvedPublisherInfo"];
}) {
  const theme = useTheme();
  const isUpperMediumScreen = useMediaQuery(theme.breakpoints.up("lg"));
  return (
    <div
      className={CSS.AuthorInfo}
      style={!isUpperMediumScreen ? { display: "none" } : {}}
    >
      <Portal
        container={
          !isUpperMediumScreen
            ? () => {
                return document.getElementsByClassName(CSS.ProductInfo).item(0);
              }
            : () => {
                return document.getElementsByClassName(CSS.AuthorInfo).item(0);
              }
        }
      >
        {userInfo && (
          <Paper
            className="mt-4 max-w-[500px] mx-auto"
            data-force-smooth-transition
          >
            <Typography variant="body1" p={2}>
              Informasi Penjual
            </Typography>
            <Divider />
            <Box className={CSS.SummaryUser} p={2}>
              <div className={CSS.ProfilePicture}>
                {userInfo.photoURL && (
                  <Image
                    fill
                    sizes="7vw"
                    src={userInfo.photoURL}
                    alt={`Photo of ${userInfo.displayName}`}
                  />
                )}
                {!userInfo.photoURL && <Avatar className="w-16" />}
              </div>

              <Typography flex={1}>{userInfo.displayName}</Typography>
              {userInfo.email && (
                <Button
                  variant="contained"
                  component={Link}
                  href={`mailto:${userInfo.email}`}
                >
                  E-mail
                </Button>
              )}
            </Box>
          </Paper>
        )}
      </Portal>
    </div>
  );
}
