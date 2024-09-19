import IsComingSoonSSR from "@/libs/firebase/comingSoonChecker";
import { Button, TextField, Typography } from "@mui/material";
import HelpFormModule from "./FormModule";

export default async function HelpSupportPage() {
  // const [user, loading, error] = useAuthState(FirebaseAuth);
  // if (await IsComingSoonSSR())
  //   return <iframe className="fullscreen_cmp_w_navbar" src="/cmp.html" />;

  return (
    <div className="p-4 h-full grid place-items-center mx-auto max-w-xl">
      <Typography fontWeight="bold" variant="h4" component="h1" gutterBottom>
        Dukungan
      </Typography>
      <HelpFormModule>
        <TextField
          type="text"
          label="Nama"
          name="form_title"
          variant="filled"
          className="mb-4"
        />
        <TextField
          type="email"
          label="Email"
          name="user_email"
          variant="filled"
          className="mb-4"
        />
        <TextField
          multiline
          label="Jelaskan Keluhan..."
          name="description"
          variant="outlined"
          minRows={3}
          maxRows={6}
          className="mb-4"
        />
        <Button type="submit" variant="contained" className="mb-4">
          Kirim
        </Button>
        <Typography>
          Dengan mengirim masukan anda, kami akan mengambil data sistem anda
          menurut Kebijakan Privasi kami
        </Typography>
      </HelpFormModule>
    </div>
  );
}
