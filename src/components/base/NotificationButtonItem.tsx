"use client";

import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { NotificationItem } from "./NotificationManager";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { useState } from "react";

export default function NotificationButtonItem({
  item,
  deleteHandler,
}: {
  item: NotificationItem;
  deleteHandler: (id: string) => void;
}) {
  return (
    <ListItemButton alignItems="flex-start" className="px-6">
      {item.current_blob_img_url && (
        <ListItemAvatar>
          <Avatar
            alt={`Photo Notification of ${item.title}`}
            src={item.current_blob_img_url}
          />
        </ListItemAvatar>
      )}
      <ListItemText
        primary={item.title && item.title}
        secondary={
          <>
            <Typography
              component="p"
              variant="body2"
              className="line-clamp-2 text-ellipsis"
              color="text.primary"
            >
              {item.body && item.body}
            </Typography>
            <span>
              {formatDistanceToNow(item.timestampInMs ?? 0, {
                addSuffix: true,
                locale: id,
              })}
            </span>
          </>
        }
      />
    </ListItemButton>
  );
}
