import paths from "@/components/paths";
import Link from "next/link";

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
