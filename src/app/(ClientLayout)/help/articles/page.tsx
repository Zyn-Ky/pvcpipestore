import IsComingSoonSSR from "@/libs/firebase/comingSoonChecker";
import { TextField } from "@mui/material";

export default async function HelpArticlesPage() {
  // const [user, loading, error] = useAuthState(FirebaseAuth);
  if (await IsComingSoonSSR())
    return <iframe className="fullscreen_cmp_w_navbar" src="/cmp.html" />;
  return (
    <>
      <h1>Artikel</h1>
      <p>Cara memasang pipa pvc</p>
      <p>Memilih aksesoris yang benar</p>
    </>
  );
}
