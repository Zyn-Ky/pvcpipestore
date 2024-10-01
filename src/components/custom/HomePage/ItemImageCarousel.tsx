import { Button, Paper, Typography } from "@mui/material";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import dynamic from "next/dynamic";
import { Key, memo } from "react";
import Link from "next/link";
import Image from "next/image";
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

const ItemImageCarousel = memo(function ItemImageCarousel(
  props: ItemImageCarousel
) {
  return (
    <>
      <div className="relative w-full h-[60vh] min-h-[575px] max-h-[1080px]">
        <Image
          className="w-full h-full absolute inset-0 object-cover pointer-events-none blur-sm brightness-75"
          src={props.src}
          alt={props.alt}
          fill
          sizes="25vw"
          priority
        />
        <div className="absolute inset-0 text-white p-12 flex justify-center items-center flex-col text-center ">
          <Typography
            fontWeight="bold"
            variant="h4"
            component="h1"
            gutterBottom
          >
            {props.title && props.title}
          </Typography>
          <Typography component="p" gutterBottom>
            {props.description && props.description}
          </Typography>
          <div>
            {props.actionButton &&
              props.actionButton.map((action, i) => (
                <Button
                  key={`X_LINK_ACTION_${props.key && props.key}_${i}`}
                  variant={action.outlined ? "outlined" : "contained"}
                  color={action.outlined ? "inherit" : "info"}
                  className="m-1"
                  LinkComponent={Link}
                  href={action.href}
                >
                  {action.text && action.text}
                </Button>
              ))}
          </div>
        </div>
      </div>
    </>
  );
});

export default ItemImageCarousel;
