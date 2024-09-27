import IsComingSoonSSR from "@/libs/firebase/comingSoonChecker";
import { Button, TextField, Typography } from "@mui/material";
import HelpFormModule from "./FormModule";
import { useTranslations } from "next-intl";

export default function HelpSupportPage() {
  // const [user, loading, error] = useAuthState(FirebaseAuth);
  // if (await IsComingSoonSSR())
  //   return <iframe className="fullscreen_cmp_w_navbar" src="/cmp.html" />;
  const t = useTranslations("FEEDBACK_UI");
  return (
    <div className="p-4 h-full grid place-items-center mx-auto max-w-xl">
      <Typography fontWeight="bold" variant="h4" component="h1" gutterBottom>
        {t("PAGE_TITLE")}
      </Typography>
      <HelpFormModule>
        <TextField
          type="text"
          label={t("TITLE_PLACEHOLDER")}
          name="form_title"
          variant="filled"
          className="mb-4"
        />
        <TextField
          type="email"
          label={t("EMAIL_PLACEHOLDER")}
          name="user_email"
          variant="filled"
          className="mb-4"
        />
        <TextField
          multiline
          label={t("DESCRIPTION_PLACEHOLDER")}
          name="description"
          variant="outlined"
          minRows={3}
          maxRows={6}
          className="mb-4"
        />
        <Button type="submit" variant="contained" className="mb-4">
          {t("SEND_TEXT")}
        </Button>
        <Typography>{t("PRIVACY_NOTICE_TEXT")}</Typography>
      </HelpFormModule>
    </div>
  );
}
