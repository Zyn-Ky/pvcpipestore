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
          src={props.nextImage ?? ""}
          width={108}
          alt={props.alt && props.alt}
        />
      </Item>
    </>
  );
}
