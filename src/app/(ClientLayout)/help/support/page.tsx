import IsComingSoonSSR from "@/libs/firebase/comingSoonChecker";
import { TextField } from "@mui/material";

export default async function HelpSupportPage() {
  // const [user, loading, error] = useAuthState(FirebaseAuth);
  if (await IsComingSoonSSR())
    return <iframe className="fullscreen_cmp_w_navbar" src="/cmp.html" />;
  return (
    <>
      <h1>Dukungan</h1>
      <TextField type="text" label="Nama" variant="filled" />
      <br />
      <br />
      <TextField type="email" label="Email" variant="filled" />
      <br />
      <br />
      <TextField multiline label="Jelaskan Keluhan..." variant="outlined" />
      <br />
    </>
  );
}
