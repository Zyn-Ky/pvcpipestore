import ProtectedHiddenDevelopmentComponent from "@/components/base/ProtectedHiddenDevComponent";
import ClientOnlyModule from "./ClientOnlyModule";

export default function FirstSetupSettingsUI() {
  return (
    <>
      <h1>Pengaturan Pertama Kali</h1>
      <ProtectedHiddenDevelopmentComponent>
        <ClientOnlyModule />
      </ProtectedHiddenDevelopmentComponent>
    </>
  );
}
