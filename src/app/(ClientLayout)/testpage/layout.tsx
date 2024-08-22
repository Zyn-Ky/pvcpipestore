import IsComingSoonSSR from "@/libs/firebase/comingSoonChecker";

export default async function DevGuardian(props: {
  children: React.ReactNode;
}) {
  if (await IsComingSoonSSR())
    return <iframe className="fullscreen_cmp_w_navbar" src="/cmp.html" />;
  return props.children && props.children;
}
