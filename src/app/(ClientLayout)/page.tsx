import CSS from "@/scss/HomePage.module.scss";
import { Button, Paper, Typography } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import dynamic from "next/dynamic";
import OurServices from "@/components/custom/HomePage/OurServices";
import OurPartners from "@/components/custom/HomePage/OurPartners";
import {
  HomePage_CoverPipaPVC_Img,
  HomePage_KelebihanPipaPVC_Img,
  PartnerHocoImg,
  PartnerItronImg,
  PartnerKitzImg,
  PartnerOndaImg,
  PartnerPenguinImg,
  PartnerPerrunoImg,
  PartnerPolyfuseImg,
  PartnerRucika1Img,
  PartnerRucikaImg,
  PartnerYutaImg,
} from "@/components/assets/images";
import { CarouselModule } from "./CarouselModule";
import Image from "next/image";
import { useTranslations } from "next-intl";

const TestimonialModule = dynamic(
  () => import("@/components/custom/HomePage/TestimonialModule")
);
const FancySeperator = dynamic(
  () => import("@/components/custom/HomePage/FancySeperator")
);

export default function Home() {
  const text = useTranslations("HOME_UI");
  return (
    <div itemType="https://schema.org/Organization" itemScope>
      <div className={CSS.HeroBox}>
        <CarouselModule />
        <FancySeperator />
      </div>
      <div className={CSS.OurServicesList}>
        <Typography fontWeight="bold" variant="h4" gutterBottom>
          {text("WHY_CHOOSE_US")}
        </Typography>
        <div className={CSS.UXLists}>
          <OurServices
            icon={<FlightLandIcon fontSize="large" />}
            header={text("REASON_TO_CHOOSE_US_1")}
            text={text("REASON_TO_CHOOSE_US_1_BODY")}
          />
          <OurServices
            icon={<AdsClickIcon fontSize="large" />}
            header={text("REASON_TO_CHOOSE_US_2")}
            text={text("REASON_TO_CHOOSE_US_2_BODY")}
          />
          <OurServices
            icon={<EmojiEventsIcon fontSize="large" />}
            header={text("REASON_TO_CHOOSE_US_3")}
            text={text("REASON_TO_CHOOSE_US_3_BODY")}
          />
        </div>
      </div>
      <div className={CSS.KelebihanBoxWrapper} id="keunggulan">
        <div className={CSS.CoverImage}>
          <Image
            src={HomePage_CoverPipaPVC_Img}
            alt="Foto Pipa Paralon PVC"
            fill
            sizes="40vw"
            className={CSS.Image}
            draggable={false}
          />
        </div>
        <div className={CSS.TextContainer}>
          <Typography fontWeight="bold" variant="h4" gutterBottom>
            {text("WHAT_IS_PVC")}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {text("PIPA_PVC_DEFINITION")}
          </Typography>
          <Typography variant="body2" fontStyle="italic" sx={{ mt: 3 }}>
            {text("PIPA_PVC_DEFINITION_ALT_TEXT")}
          </Typography>
        </div>
      </div>
      <div
        className={
          CSS.KelebihanBoxWrapper +
          " " +
          CSS.RowInverted +
          " " +
          CSS.DontScaleImg
        }
      >
        <div className={CSS.TextContainer}>
          <Typography fontWeight="bold" variant="h4" gutterBottom>
            {text("KEUNGGULAN_KAMI")}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {text("KEUNGGULAN_KAMI_TEXT")}
          </Typography>
        </div>
        <div className={CSS.CoverImage}>
          <Image
            src={HomePage_KelebihanPipaPVC_Img}
            alt="Foto Pipa Paralon PVC"
            fill
            sizes="40vw"
            className={CSS.Image}
            draggable={false}
          />
        </div>
      </div>
      <div className={CSS.OuterTestimonialWrapper}>
        <Typography
          fontWeight="bold"
          variant="h4"
          gutterBottom
          textAlign="center"
        >
          {text("TESTI_TITLE")}
        </Typography>
        <Typography gutterBottom textAlign="center" sx={{ mb: 5 }}>
          {text("TESTI_DESC")}
        </Typography>
        <TestimonialModule
          items={[...new Array(5)].map(() => ({
            authorName: "Nopal market1",
            textContent: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae facilis molestias tenetur sequi reprehenderit sapiente quibusdam commodi, distinctio, obcaecati, esse magni ratione quia earum ut quod fuga magnam iusto voluptas?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae facilis molestias tenetur sequi reprehenderit sapiente quibusdam commodi, distinctio, obcaecati, esse magni ratione quia earum ut quod fuga magnam iusto voluptas?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae facilis molestias tenetur sequi reprehenderit sapiente quibusdam commodi, distinctio, obcaecati, esse magni ratione quia earum ut quod fuga magnam iusto voluptas?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae facilis molestias tenetur sequi reprehenderit sapiente quibusdam commodi, distinctio, obcaecati, esse magni ratione quia earum ut quod fuga magnam iusto voluptas?`,
          }))}
        />
      </div>
      <div className={CSS.Partners}>
        <Typography fontWeight="bold" variant="h4" gutterBottom>
          {text("OUR_PARTNER")}
        </Typography>
        <div className={CSS.LogoLists}>
          <OurPartners nextImage={PartnerHocoImg} alt="Hoco® Logo" />
          <OurPartners nextImage={PartnerItronImg} alt="Itron® Logo" />
          <OurPartners nextImage={PartnerKitzImg} alt="Kitz® Logo" />
          <OurPartners nextImage={PartnerOndaImg} alt="Onda® Logo" />
          <OurPartners nextImage={PartnerPenguinImg} alt="Penguin® Logo" />
          <OurPartners nextImage={PartnerPerrunoImg} alt="Perruno® Logo" />
          <OurPartners nextImage={PartnerPolyfuseImg} alt="Polyfuse® Logo" />
          <OurPartners nextImage={PartnerRucika1Img} alt="Rucika Kelen® Logo" />
          <OurPartners nextImage={PartnerRucikaImg} alt="Hoco® Logo" />
          <OurPartners nextImage={PartnerYutaImg} alt="Yuta© Logo" />
        </div>
      </div>
      <div className={CSS.AboutCompany}>
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
        >
          {text("ABOUT_US")}
        </Typography>
        <Typography variant="body2" textAlign="center">
          Distributor Pipa uPVC yang menyediakan pipa jenis Pipa uPVC yang
          berkualitas tinggi dengan harga yang terjangkau.
        </Typography>
      </div>
      <div className={CSS.RecommendationsProd}></div>
    </div>
  );
}
