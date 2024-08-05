import SITE_CONFIG from "@/components/config";
import paths from "@/components/paths";
import { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: `Daftar - ${SITE_CONFIG.SEO.Title}`,
};
export default function LoginUI() {
  return (
    <>
      <h1>Register</h1>
      <p>
        Sudah mempunyai akun?
        <Link href={paths.AUTH_LOGIN}>Login disini</Link>
      </p>
    </>
  );
}
