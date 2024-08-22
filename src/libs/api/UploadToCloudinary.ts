import { UploadApiResponse } from "cloudinary";
import InitCloudinary from "../cloudinary/InitCloudinaryCred";

export type UploadedImageResult = {
  url: string;
  created_at: string;
  public_id: string;
  width: number;
  height: number;
};

export default async function UploadToCloudinary(
  folderpath: string,
  binary: File
): Promise<UploadedImageResult> {
  const cloudinary = InitCloudinary();
  const ab = await binary.arrayBuffer();
  const buffer = new Uint8Array(ab);
  const results = await new Promise<UploadApiResponse | undefined>(
    (resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: folderpath }, function (error, result) {
          if (error) {
            reject(error);
            return;
          }
          resolve(result);
        })
        .end(buffer);
    }
  );
  if (results) {
    const { secure_url, created_at, public_id, width, height } = results;
    return {
      url: secure_url,
      created_at,
      public_id,
      width,
      height,
    };
  }
  return {
    url: "",
    public_id: "",
    created_at: "",
    width: 0,
    height: 0,
  };
}
