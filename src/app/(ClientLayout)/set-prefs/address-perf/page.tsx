import ProtectedHiddenDevelopmentComponent from "@/components/base/ProtectedHiddenDevComponent";
import { TextField } from "@mui/material";

export default function SetDefaultAddressSettingsUI(params: any) {
  // const [user, loading, error] = useAuthState(FirebaseAuth);

  return (
    <>
      <h1>Alamat pengiriman</h1>
      <ProtectedHiddenDevelopmentComponent>
        <TextField type="main_address" label="Alamat" />
        <TextField
          type="addon_address"
          label="Apartemen, Kamar, No. Rumah, dll"
        />
      </ProtectedHiddenDevelopmentComponent>
    </>
  );
}
