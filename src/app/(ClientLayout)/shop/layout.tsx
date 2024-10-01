import IsComingSoonSSR from "@/libs/firebase/comingSoonChecker";
import CSS from "@/scss/ShopPage.module.scss";
import SidebarFilterModule from "./SidebarFilterModule";

export default async function ShopLayout(props: {
  children: React.ReactNode;
  params: { params?: string[] };
}) {
  return (
    <main className={`${CSS.ShopContainer} p-4`}>
      <SidebarFilterModule />
      <div className={CSS.Content}>{props.children}</div>
    </main>
  );
}
