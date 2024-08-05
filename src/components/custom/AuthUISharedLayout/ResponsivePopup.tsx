"use client";
import CSS from "@/scss/AuthUISharedLayout.module.scss";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Paper,
  Slide,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { forwardRef, PropsWithChildren, useState } from "react";
import { useRouter } from "next/navigation";
import { TransitionProps } from "@mui/material/transitions";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ResponsivePopup(props: PropsWithChildren) {
  const theme = useTheme();
  const router = useRouter();
  const isSmallerMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallerSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isBiggerScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [closedStatus, setClosedStatus] = useState(false);

  function CloseLogin() {
    setClosedStatus(true);
    setTimeout(() => {
      router.back();
      setClosedStatus(false);
    }, theme.transitions.duration.standard || 300);
  }
  return (
    <>
      {isBiggerScreen && (
        <Paper className={CSS.OuterFormContainer} elevation={12}>
          {props.children && props.children}
        </Paper>
      )}
      <Dialog
        fullScreen={isSmallerSmallScreen}
        open={!closedStatus ? !isBiggerScreen : false}
        onClose={CloseLogin}
        TransitionComponent={Transition}
        PaperProps={{
          sx: { minWidth: isSmallerSmallScreen ? 0 : 500 },
        }}
      >
        <DialogContent dividers>
          {props.children && props.children}
        </DialogContent>
        <DialogActions>
          <Button onClick={CloseLogin}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
