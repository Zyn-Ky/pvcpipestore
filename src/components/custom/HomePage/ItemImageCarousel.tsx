import { Button, Paper } from "@mui/material";
import { ContainerItemTextCarousel } from "./HeroBox";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import dynamic from "next/dynamic";
import { Key } from "react";
import Link from "next/link";
type ItemImageCarousel = {
  src: string | StaticImport;
  alt: string;
  title: string;
  description?: string;
  actionButton?: {
    text: string;
    href: string;
    outlined: boolean;
  }[];
  key?: Key | null | undefined;
};
const BetterBgImg = dynamic(
  () => import("@/components/custom/HomePage/BetterBgImg")
);
export default function ItemImageCarousel(props: ItemImageCarousel) {
  return (
    <>
      <Paper
        sx={{
          position: "relative",
          width: "100%",
          height: "60vh",
          minHeight: "500px",
          maxHeight: "1080px",
        }}
      >
        <BetterBgImg
          src={props.src}
          alt={props.alt}
          width={1406}
          height={500}
          priority
        />
        <ContainerItemTextCarousel>
          <h1>{props.title && props.title}</h1>
          <p>{props.description && props.description}</p>
          <div>
            {props.actionButton &&
              props.actionButton.map((action, i) => (
                <Link
                  href={action.href}
                  key={`X_LINK_ACTION_${props.key && props.key}_${i}`}
                >
                  <Button
                    variant={action.outlined ? "outlined" : "contained"}
                    color={action.outlined ? "inherit" : "info"}
                    sx={{ m: 1 }}
                  >
                    {action.text && action.text}
                  </Button>
                </Link>
              ))}
          </div>
        </ContainerItemTextCarousel>
      </Paper>
    </>
  );
}
