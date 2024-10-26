import CSS from "@/scss/HomePage.module.scss";
import { Typography } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import dynamic from "next/dynamic";
import OurServices from "@/components/custom/HomePage/OurServices";
import OurPartners from "@/components/custom/HomePage/OurPartners";
import {
  HomePage_CoverImg,
  HomePage_CoverPipaPVC_Img,
  HomePage_KelebihanPipaPVC_Img,
  PartnerHocoImg,
  PartnerItronImg,
  PartnerKitzImg,
  PartnerOndaImg,
  PartnerPenguinImg,
  PartnerPerrunoImg,
  PartnerPolyfuseImg,
  PartnerRucikaImg,
  PartnerYutaImg,
} from "@/components/assets/images";
import { CarouselModule } from "./CarouselModule";
import Image from "next/image";
import { useTranslations } from "next-intl";
import ProductRecommendModule from "./ProductRecommendModule";
import ProtectedHiddenDevelopmentComponent from "@/components/base/ProtectedHiddenDevComponent";
import BusinessIcon from "@mui/icons-material/Business";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import CallIcon from "@mui/icons-material/Call";
const TestimonialModule = dynamic(
  () => import("@/components/custom/HomePage/TestimonialModule"),
  { ssr: false }
);
const FancySeperator = dynamic(
  () => import("@/components/custom/HomePage/FancySeperator"),
  { ssr: true }
);

export default function Home() {
  const text = useTranslations("HOME_UI");
  return (
    <div itemType="https://schema.org/Organization" itemScope>
      <div className={CSS.HeroBox}>
        <CarouselModule />
        {/* <div className="w-full h-full relative">
          <Image
            src={HomePage_CoverImg}
            fill
            alt="Product Cover"
            sizes="27vw"
            priority
          />
        </div> */}
        <FancySeperator />
      </div>
      <div className="p-2 mt-4 min-h-[200px] text-center my-4">
        <Typography fontWeight="bold" variant="h4" gutterBottom>
          {text("WHY_CHOOSE_US")}
        </Typography>
        <div className="flex mt-4 justify-center gap-4 flex-col md:flex-row h-auto md:h-[250px] items-center md:items-start">
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
            sizes="35vw"
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
          <Typography
            variant="body2"
            fontStyle="italic"
            className={CSS.AltText}
          >
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
            sizes="35vw"
            className={CSS.Image}
            draggable={false}
          />
        </div>
      </div>
      {/* <ProtectedHiddenDevelopmentComponent>
        <Typography
          fontWeight="bold"
          variant="h4"
          gutterBottom
          textAlign="center"
        >
          {text("PRODUCT_RECOMMENDATION_TITLE")}
        </Typography>
        <div className={CSS.ProductRecommended}>
          <ProductRecommendModule />
        </div>
      </ProtectedHiddenDevelopmentComponent> */}
      <div className="p-5 max-w-[960px] mx-auto">
        <Typography
          fontWeight="bold"
          variant="h4"
          gutterBottom
          textAlign="center"
        >
          {text("TESTI_TITLE")}
        </Typography>
        <Typography gutterBottom textAlign="center" className="mb-12">
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
              authorName: "Mr.Ardhan market2",
              textContent:
                "Saya merekomendasikan pipa ini. Kuat, tahan lama, dan fleksibel, ideal untuk proyek saya",
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
          <OurPartners nextImage={PartnerRucikaImg} alt="Hoco® Logo" />
          <OurPartners nextImage={PartnerYutaImg} alt="Yuta© Logo" />
        </div>
      </div>
      <div className="flex p-20 text-start whitespace-break-spaces gap-12 select-text max-w-[1080px] mx-auto muiMd:gap-20 flex-col muiMd:flex-row">
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
          <div key={t[0]} className="flex-[50%]">
            <Typography
              variant="h4"
              fontWeight="bold"
              textAlign="left"
              gutterBottom
            >
              {t[0]}
            </Typography>
            <Typography variant="body2" textAlign="left" component="p">
              {t[1]}
            </Typography>
          </div>
        ))}
      </div>
      <div className="p-2 mb-4">
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
      <div className="p-2 max-w-[560px] mx-auto">
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
        >
          Hubungi Kami
        </Typography>
        <table className="border-spacing-4">
          <tbody>
            {[
              [
                <BusinessIcon key="BUSINESS_ICON" />,
                <>
                  <Typography component="p">
                    Perumahan The Quality Residence No. A16-17 Jatikalang Krian
                    Sidoarjo
                  </Typography>
                </>,
              ],
              [
                <></>,
                <iframe
                  key="IFRAME_GOOGLE_MAPS"
                  loading="lazy"
                  className="w-full h-[400px] border-none rounded-2xl"
                  src="https://www.google.com/maps/embed/v1/place?q=Pipa+HDPE,+Pipa+PVC,+Pipa+PPR,+Fitting+dan+Mesin+Jawa+Timur&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
                />,
              ],
              [
                <CallIcon key="CALL_ICON" />,
                <a
                  href="tel:+6283199894287"
                  key="CALL_TEXT"
                  className="text-blue-500 underline"
                >
                  (031) 9989 4287
                </a>,
              ],
              [
                <AlternateEmailIcon key="EMAIL_ICON" />,
                <a
                  href="mailto:market3@solusiintibersama.com"
                  className="text-blue-500 underline"
                  key="EMAIL_TEXT"
                >
                  market3@solusiintibersama.com
                </a>,
              ],
            ].map((val, i) => (
              <tr key={i}>
                <td className={`text-right ${i === 0 && "align-top"}`}>
                  {val[0]}
                </td>
                <td className="align-baseline">{val[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Typography component="p">
          Terima kasih telah mengunjungi website kami. Jika ada pertanyaan atau
          butuh informasi lebih lanjut Kami siap membantu memberikan solusi
          terbaik untuk Anda.
        </Typography>
      </div>

      <div className={CSS.RecommendationsProd}></div>
    </div>
  );
}
