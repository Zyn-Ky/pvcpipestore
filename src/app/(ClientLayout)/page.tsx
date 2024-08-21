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
          items={[
            {
              authorName: "Andi",
              textContent: `Pipa PVC ini benar-benar memenuhi harapan kami. Kualitasnya sangat baik—tahan lama, kuat, dan tidak mudah bocor. Pengalaman kami dengan pipa ini menunjukkan ketahanan yang luar biasa dalam berbagai aplikasi. Sangat puas dengan performanya dan pastinya akan terus memilih perusahaan ini di masa depan.`,
            },

            {
              authorName: "Rudi",
              textContent: `Pipa PVC SDR 41 dari perusahaan ini benar-benar luar biasa untuk pembuangan limbah. Dengan ketahanan yang tinggi dan kualitas yang sangat baik, pipa ini mengatasi tekanan dan bahan kimia dengan sempurna. Kami sangat puas dengan performanya dan akan terus menggunakan produk ini.`,
            },
            {
              authorName: "Rina",
              textContent: `Pipa PVC conduit dari perusahaan ini benar-benar berkualitas. Kuat, tahan lama, dan fleksibel, ideal untuk instalasi kabel di berbagai kondisi. Instalasi jadi lebih mudah dan hasilnya sangat memuaskan.`,
            },
            {
              authorName: "Nopal market1",
              textContent: "ambatakammmm",
            },
            {
              authorName: "Nopal market1",
              textContent: "ya ya pipa ini bagus sekali, saya merekomendasikan",
            },
          ]}
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
          {/* <OurPartners nextImage={PartnerRucika1Img} alt="Rucika Kelen® Logo" /> */}
          <OurPartners nextImage={PartnerRucikaImg} alt="Hoco® Logo" />
          <OurPartners nextImage={PartnerYutaImg} alt="Yuta© Logo" />
        </div>
      </div>
      <div className={CSS.OurMissionContainer}>
        {[
          [
            `Visi Kami`,
            `Distributor Pipa PVC yang menyediakan pipa jenis Pipa PVC yang berkualitas tinggi dengan harga yang terjangkau.`,
          ],
          [
            `Misi Kami`,
            `Misi kami adalah menyediakan pipa PVC berkualitas tinggi yang dapat diandalkan untuk berbagai aplikasi, mulai dari distribusi air bersih, pengelolaan limbah, hingga infrastruktur industri. Kami berkomitmen untuk:\n
- Menyediakan Produk Berkualitas Tinggi: Mengembangkan dan memproduksi pipa dengan standar kualitas tertinggi untuk memastikan daya tahan, keamanan, dan kinerja optimal di berbagai aplikasi industri.\n
- Inovasi Berkelanjutan: Berinvestasi dalam penelitian dan pengembangan untuk menciptakan teknologi baru dan metode produksi yang lebih efisien serta ramah lingkungan.\n
- Kepuasan Pelanggan: Menyediakan layanan pelanggan yang unggul, mulai dari konsultasi teknis hingga dukungan pasca penjualan, untuk memastikan kepuasan dan kepercayaan pelanggan.\n
- Kualitas dan Keamanan: Mematuhi standar dan regulasi internasional serta melakukan pengujian ketat untuk memastikan setiap produk memenuhi spesifikasi dan persyaratan keamanan.`,
          ],
        ].map((t) => (
          <div key={t[0]} className={CSS.Item}>
            <Typography
              variant="h4"
              fontWeight="bold"
              textAlign="left"
              gutterBottom
            >
              {t[0]}
            </Typography>
            <Typography variant="body2" textAlign="left" paragraph>
              {t[1]}
            </Typography>
          </div>
        ))}
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
