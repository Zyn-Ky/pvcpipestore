import { v2 } from "cloudinary";

export default function InitCloudinary() {
  v2.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.SECURED_CLOUDINARY_API_KEY,
    api_secret: process.env.SECURED_CLOUDINARY_API_SECRET,
  });
  return v2;
}
