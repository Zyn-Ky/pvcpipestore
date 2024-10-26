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
        <Paper className={`${CSS.OuterFormContainer} p-6`} elevation={12}>
          {props.children && props.children}
        </Paper>
      )}
      <Dialog
        fullScreen={isSmallerSmallScreen}
        open={!closedStatus ? !isBiggerScreen : false}
        onClose={CloseLogin}
        TransitionComponent={Transition}
        PaperProps={{
          className: isSmallerSmallScreen ? "min-w-[0px]" : "min-w-[500px]",
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
