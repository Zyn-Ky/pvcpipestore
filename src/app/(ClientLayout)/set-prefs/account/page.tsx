export default function AccountSettingsUI(params: any) {
  // const [user, loading, error] = useAuthState(FirebaseAuth);

  return (
    <>
      <p>
        Bahasa :{" "}
        <select>
          <option>Indonesia</option>
        </select>
      </p>
      {JSON.stringify(params)}
    </>
  );
}