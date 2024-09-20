"use client";

import { Button, Typography } from "@mui/material";
import { useRouter } from "next-nprogress-bar";
import { PropsWithChildren } from "react";
import { useNetworkState } from "react-use";

export default function OfflineWarningWrapper({ children }: PropsWithChildren) {
  const { online } = useNetworkState({
    downlink: 0,
    downlinkMax: 0,
    effectiveType: "2g",
    online: true,
    rtt: 0,
    previous: false,
    saveData: true,
    since: new Date(),
    type: "other",
  });
  const { refresh } = useRouter();
  return online ? (
    <>{children && children}</>
  ) : (
    <div className="w-full h-full flex flex-col">
      <Typography variant="h3" component="h1">
        Anda sedang offline!
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          refresh();
        }}
      >
        Segarkan
      </Button>
    </div>
  );
}
