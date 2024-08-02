"use client";
import { useMediaQuery, useTheme } from "@mui/material";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import type { PropsWithChildren } from "react";
const PullToRefresh = dynamic(() => import("react-simple-pull-to-refresh"));
const Box = dynamic(() => import("@mui/material/Box"));
const CircularProgress = dynamic(
  () => import("@mui/material/CircularProgress")
);
const RefreshIcon = dynamic(() => import("@mui/icons-material/Refresh"));
export default function PullToRefreshWrapper(props: PropsWithChildren) {
  const { refresh } = useRouter();
  const isTouchScreen = useMediaQuery("(pointer: coarse) ");
  return (
    <>
      <PullToRefresh
        onRefresh={async () => {
          return refresh();
        }}
        refreshingContent={
          <Box sx={{ textAlign: "center", my: 4 }}>
            <CircularProgress sx={{ mb: 2 }} /> <br />
            Release to refresh
          </Box>
        }
        pullingContent={
          <Box sx={{ textAlign: "center", my: 4 }}>
            <RefreshIcon sx={{ mb: 2 }} fontSize="large" />
            <br />
            Pull more to refresh
          </Box>
        }
        maxPullDownDistance={175}
        isPullable={isTouchScreen}
        backgroundColor="inherit"
      >
        <main id="content_ui" role="main">
          {props.children && props.children}
        </main>
      </PullToRefresh>
    </>
  );
}
