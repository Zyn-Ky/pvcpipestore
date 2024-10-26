"use client";

import { Paper, styled } from "@mui/material";
import Image, { StaticImageData } from "next/image";
import CSS from "@/scss/HomePage.module.scss";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
}));
type OurPartnerProps = {
  nextImage?: StaticImageData;
  alt: string;
};
export default function OurPartners(props: OurPartnerProps) {
  return (
    <>
      <Item className={CSS.LogoItem}>
        <Image
          lazyBoundary=""
          src={props.nextImage ?? ""}
          fill
          sizes="6vw"
          alt={props.alt && props.alt}
          draggable={false}
        />
      </Item>
    </>
  );
}
