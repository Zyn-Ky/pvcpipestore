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

const TestimonialModule = dynamic(
  () => import("@/components/custom/HomePage/TestimonialModule")
);
const FancySeperator = dynamic(
  () => import("@/components/custom/HomePage/FancySeperator")
);

export default function Home() {
  return (
    <div itemType="https://schema.org/Organization" itemScope>
      <div className={CSS.HeroBox}>
        <CarouselModule />
        <FancySeperator />
      </div>
      <div className={CSS.OurServicesList}>
        <Typography fontWeight="bold" variant="h4" gutterBottom>
          Kenapa harus memilih kami?
        </Typography>
        <div className={CSS.UXLists}>
          <OurServices
            icon={<FlightLandIcon fontSize="large" />}
            header="Pengiriman Aman dan Cepat"
            text="Kami selalu mengutamakan pengiriman tepat waktu ke seluruh Indonesia."
          />
          <OurServices
            icon={<AdsClickIcon fontSize="large" />}
            header="Solusi Terbaik"
            text="Kami memberikan barang yang berekualitas dan memberikan solusi terbaik untuk kebutuhan anda"
          />
          <OurServices
            icon={<EmojiEventsIcon fontSize="large" />}
            header="Professional Team"
            text="Kami melayani dengan tim yang sudah berpengalaman dan professional."
          />
        </div>
      </div>
      <div className={CSS.KelebihanBoxWrapper}>
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
            Pipa PVC
          </Typography>
          <Typography variant="body1" gutterBottom>
            Pipa PVC juga tahan terhadap korosi dan bahan kimia, memiliki masa
            pakai yang panjang, dan sering digunakan dalam aplikasi saluran air,
            sistem pembuangan, dan berbagai proyek konstruksi.
          </Typography>
          <Typography variant="body2" fontStyle="italic" sx={{ mt: 3 }}>
            Pemasangannya relatif mudah dengan metode penyambungan yang
            menggunakan lem khusus untuk menggabungkan ujung pipa dan fitting,
            sehingga memastikan sambungan yang kuat dan tahan lama tanpa
            memerlukan alat pemanas tambahan.
          </Typography>
        </div>
      </div>
      <div className={CSS.KelebihanBoxWrapper + " " + CSS.RowInverted}>
        <div className={CSS.TextContainer}>
          <Typography fontWeight="bold" variant="h4" gutterBottom>
            Keunggulan kami
          </Typography>
          <Typography variant="body1" gutterBottom>
            Fitting pipa PVC kami menawarkan kualitas tinggi dan daya tahan yang
            luar biasa. Terbuat dari bahan berkualitas yang tahan terhadap
            berbagai bahan kimia dan korosi, fitting ini ideal untuk sistem
            saluran air dan pembuangan. Fitting kami juga dirancang untuk tahan
            terhadap perubahan suhu, cocok untuk berbagai aplikasi dalam
            instalasi air bersih dan sistem pembuangan.
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
          Berikut ulasan customer kami
        </Typography>
        <Typography gutterBottom textAlign="center" sx={{ mb: 5 }}>
          Mereka adalah sebagian yang memberikan ulasan dan menjalin kerjasama
          dengan kami
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
          Our Partners
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
          Tentang Kami
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
