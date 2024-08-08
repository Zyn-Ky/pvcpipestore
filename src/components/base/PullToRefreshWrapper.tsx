"use client";
import { useMediaQuery, useTheme } from "@mui/material";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState, type PropsWithChildren } from "react";
import MainContentTheming from "./ColorModeProvider";
import PullToRefresh from "react-simple-pull-to-refresh";
import { useEffectOnce } from "react-use";
const Box = dynamic(() => import("@mui/material/Box"));
const CircularProgress = dynamic(
  () => import("@mui/material/CircularProgress")
);
const RefreshIcon = dynamic(() => import("@mui/icons-material/Refresh"));
export default function PullToRefreshWrapper(props: PropsWithChildren) {
  const { refresh } = useRouter();
  const isTouchScreen = useMediaQuery("(pointer: coarse) ");
  const [clientHydrated, setClientHydrated] = useState(false);
  useEffectOnce(() => {
    setClientHydrated(true);
  });
  return (
    <PullToRefresh
      onRefresh={async () => {
        return refresh();
      }}
      refreshingContent={
        clientHydrated ? (
          <Box sx={{ textAlign: "center", my: 4 }}>
            <CircularProgress sx={{ mb: 2 }} /> <br />
            Release to refresh
          </Box>
        ) : (
          ""
        )
      }
      pullingContent={
        clientHydrated ? (
          <Box sx={{ textAlign: "center", my: 4 }}>
            <RefreshIcon sx={{ mb: 2 }} fontSize="large" />
            <br />
            Pull more to refresh
          </Box>
        ) : (
          ""
        )
      }
      maxPullDownDistance={175}
      isPullable={isTouchScreen}
      backgroundColor="inherit"
    >
      <MainContentTheming>
        {props.children && props.children}
      </MainContentTheming>
    </PullToRefresh>
  );
}
