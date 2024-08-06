"use client";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import PromptAuth from "./GeneratePromptAuth";
import LoginIcon from "@mui/icons-material/Login";
import { useAuthState } from "react-firebase-hooks/auth";
import { FirebaseAuth } from "@/libs/firebase/config";
import paths from "../paths";

export default function NotificationList() {
  const [ClientUserInfo, ClientUserInfoLoading, ClientUserInfoError] =
    useAuthState(FirebaseAuth);

  if (!ClientUserInfo)
    return (
      <PromptAuth
        message="Jangan lewatkan notifikasi anda! Masuk untuk melihat notifikasi"
        icon={<LoginIcon sx={{ fontSize: "6rem" }} />}
        redirectPath={paths.MOBILE_NOTIFICATION}
      />
    );
  return (
    <>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {[...new Array(10)].map((i) => (
          <ListItemButton alignItems="flex-start" key={i}>
            <ListItemAvatar>
              <Avatar
                alt="Remy Sharp"
                src="https://mui.com/static/images/avatar/3.jpg"
              />
            </ListItemAvatar>
            <ListItemText
              primary="Brunch this weekend?"
              secondary={
                <>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Ali Connors
                  </Typography>
                  {" — I'll be in your neighborhood doing errands this…"}
                </>
              }
            />
          </ListItemButton>
        ))}
      </List>
    </>
  );
}
