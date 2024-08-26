import IsComingSoonSSR from "@/libs/firebase/comingSoonChecker";
import { getDateSortedPostsData } from "@/libs/posts";
import { TextField, Typography } from "@mui/material";

export default async function HelpArticlesPage() {
  // const [user, loading, error] = useAuthState(FirebaseAuth);
  if (await IsComingSoonSSR())
    return <iframe className="fullscreen_cmp_w_navbar" src="/cmp.html" />;

  const articles = await getDateSortedPostsData();
  return (
    <>
      <Typography textAlign="center" variant="h3" fontWeight="bold">
        Artikel
      </Typography>
      <pre style={{ whiteSpace: "break-spaces", wordWrap: "break-word" }}>
        {JSON.stringify(articles, null, 2)}
      </pre>
    </>
  );
}
