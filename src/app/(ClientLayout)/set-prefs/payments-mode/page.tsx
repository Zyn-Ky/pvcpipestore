import ProtectedHiddenDevelopmentComponent from "@/components/base/ProtectedHiddenDevComponent";
import GoBackButton from "@/components/GoBackButton";
import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";

export default function PaymentProcessorSelector() {
  const t_settingspage = useTranslations("SETTINGS_PAGE");

  return (
    <ProtectedHiddenDevelopmentComponent
      fallback={
        <>
          <p className="text-left font-bold text-3xl">
            Halaman ini sedang dalam rekonstruksi besar-besaran
          </p>
        </>
      }
    >
      <GoBackButton
        title={t_settingspage("SIDEBAR_TITLE")}
        extendNode={
          <>
            <Typography variant="h4" component="h1" fontWeight="bold">
              {t_settingspage("SIDEBAR_PAYMENT_MANAGER_TEXT")}
            </Typography>
          </>
        }
      />
    </ProtectedHiddenDevelopmentComponent>
  );
}
