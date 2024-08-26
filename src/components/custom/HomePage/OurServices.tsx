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
    <div className="flex flex-col w-[220px] justify-center py-5 items-center">
      {props.icon && props.icon}
      <Typography
        variant="body1"
        fontSize="125%"
        fontWeight="bold"
        gutterBottom
        textTransform="capitalize"
        className="mt-4"
      >
        {props.header && props.header}
      </Typography>
      <Typography variant="body2">{props.text && props.text}</Typography>
    </div>
  );
}
