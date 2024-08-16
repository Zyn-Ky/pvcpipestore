import IsComingSoonSSR from "@/libs/firebase/comingSoonChecker";

export default async function XTest() {
  // const [user, loading, error] = useAuthState(FirebaseAuth);
  if (await IsComingSoonSSR())
    return <iframe className="fullscreen_cmp_w_navbar" src="/cmp.html" />;
  return (
    <>
      <h1>Coming Soon</h1>
    </>
  );
}
