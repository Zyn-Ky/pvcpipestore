import IsComingSoonSSR from "@/libs/firebase/comingSoonChecker";

export default async function AdminPage() {
  if (await IsComingSoonSSR())
    return (
      <>
        <iframe className="fullscreen_cmp_w_navbar" src="/cmp.html" />
      </>
    );
  return <>Test</>;
}
