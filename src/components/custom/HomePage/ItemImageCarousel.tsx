import { Button, Paper } from "@mui/material";
import { ContainerItemTextCarousel } from "./HeroBox";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import dynamic from "next/dynamic";
import { Key, memo } from "react";
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

const ItemImageCarousel = memo(function ItemImageCarousel(
  props: ItemImageCarousel
) {
  return (
    <>
      <div className="relative w-full h-[60vh] min-h-[575px] max-h-[1080px]">
        <BetterBgImg
          src={props.src}
          alt={props.alt}
          fill
          sizes="27vw"
          priority
        />
        <ContainerItemTextCarousel>
          <h1>{props.title && props.title}</h1>
          <p>{props.description && props.description}</p>
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
        </ContainerItemTextCarousel>
      </div>
    </>
  );
});

export default ItemImageCarousel;
