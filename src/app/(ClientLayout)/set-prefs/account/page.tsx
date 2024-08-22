import ProtectedHiddenDevelopmentComponent from "@/components/base/ProtectedHiddenDevComponent";

export default function AccountSettingsUI(params: any) {
  // const [user, loading, error] = useAuthState(FirebaseAuth);

  return (
    <>
      <h1>Akun</h1>
      <ProtectedHiddenDevelopmentComponent>
        <p>
          Bahasa :{" "}
          <select>
            <option>Indonesia</option>
          </select>
        </p>
        {JSON.stringify(params)}
      </ProtectedHiddenDevelopmentComponent>
    </>
  );
}
