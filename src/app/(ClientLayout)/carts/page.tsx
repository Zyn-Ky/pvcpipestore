import { Metadata } from "next";
import SITE_CONFIG from "@/components/config";
import { CartsClient } from "./ExtendedPage";

export const metadata: Metadata = {
  title: `Keranjang - ${SITE_CONFIG.SEO.Title}`,
};

export default function CartsItemList() {
  return <CartsClient />;
}
