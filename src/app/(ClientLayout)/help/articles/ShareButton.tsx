"use client";

import { GeneratePostURL } from "@/components/paths";
import { Share } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

export default function ShareButton({
  data,
}: {
  data: {
    [key: string]: any;
    id: string;
  };
}) {
  return (
    <Tooltip
      title="Share"
      onClick={() => {
        if (!data || !data.id || !data.title) return;
        navigator.share({
          url: GeneratePostURL(data.id),
          title: data.title ?? "",
        });
      }}
    >
      <IconButton>
        <Share />
      </IconButton>
    </Tooltip>
  );
}
