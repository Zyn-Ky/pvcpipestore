import { useGeneralFunction } from "@/components/base/GeneralWrapper";
import { TextField } from "@mui/material";

export default function ClientOnlyModule() {
  //   useGeneralFunction();
  return (
    <>
      <TextField type="main_address" label="Alamat" />
      <TextField
        type="addon_address"
        label="Apartemen, Kamar, No. Rumah, dll"
      />
    </>
  );
}
