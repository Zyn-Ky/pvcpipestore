import IsComingSoonSSR from "@/libs/firebase/comingSoonChecker";
import { Button, TextField, Typography } from "@mui/material";
import HelpFormModule from "./FormModule";

export default async function HelpSupportPage() {
  // const [user, loading, error] = useAuthState(FirebaseAuth);
  // if (await IsComingSoonSSR())
  //   return <iframe className="fullscreen_cmp_w_navbar" src="/cmp.html" />;

  return (
    <>
      <h1>Dukungan</h1>
      <HelpFormModule>
        <TextField
          type="text"
          label="Nama"
          name="form_title"
          variant="filled"
        />
        <br />
        <br />
        <TextField
          type="email"
          label="Email"
          name="user_email"
          variant="filled"
        />
        <br />
        <br />
        <TextField
          multiline
          label="Jelaskan Keluhan..."
          name="description"
          variant="outlined"
          minRows={3}
          maxRows={6}
        />
        <br />
        <Button type="submit">Kirim</Button>
        <Typography>
          Dengan mengirim masukan anda. Kami akan mengambil data sistem anda
          menurut Kebijakan Privasi kami
        </Typography>
      </HelpFormModule>
    </>
  );
}
