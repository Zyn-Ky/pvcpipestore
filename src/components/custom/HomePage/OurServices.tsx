import { Typography } from "@mui/material";
import CSS from "@/scss/HomePage.module.scss";
import { ReactNode } from "react";
type ItemOurServices = {
  icon: ReactNode;
  header: string;
  text: string;
};

export default function OurServices(props: ItemOurServices) {
  return (
    <div className={CSS.Item}>
      {props.icon && props.icon}
      <Typography
        variant="body1"
        fontSize="125%"
        fontWeight="bold"
        gutterBottom
        textTransform="capitalize"
        className={CSS.ItemTitle}
      >
        {props.header && props.header}
      </Typography>
      <Typography variant="body2">{props.text && props.text}</Typography>
    </div>
  );
}
