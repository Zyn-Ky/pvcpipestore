import IsComingSoonSSR from "@/libs/firebase/comingSoonChecker";
import CSS from "@/scss/ShopPage.module.scss";
import SidebarFilterModule from "./SidebarFilterModule";

export default async function ShopLayout(props: {
  children: React.ReactNode;
  params: { params?: string[] };
}) {
  if (await IsComingSoonSSR())
    return <iframe className="fullscreen_cmp_w_navbar" src="/cmp.html" />;

  return (
    <main className={CSS.ShopContainer}>
      <SidebarFilterModule />
      <div className={CSS.Content}>{props.children}</div>
    </main>
  );
}
