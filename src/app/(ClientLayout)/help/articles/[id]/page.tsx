import ProtectedHiddenDevelopmentComponent from "@/components/base/ProtectedHiddenDevComponent";
import { getPost } from "@/libs/posts";
import { Typography } from "@mui/material";
import { parseISO, format, toDate } from "date-fns";
import { notFound } from "next/navigation";
import { WhatsappShare } from "react-share-kit";
import ShareButton from "./ShareButton";
import { Metadata } from "next";
import { unstable_cache } from "next/cache";
export const dynamic = "force-dynamic";
const getCachedPost = unstable_cache(getPost, ["FETCH_POST_ITEM"], {
  tags: ["FETCH_POST_ITEM"],
  revalidate:
    process.env.NODE_ENV === "development"
      ? parseInt(process.env.DEVMODE_PRODUCT_DB_CACHE_REVALIDATE_TIME || "300")
      : 60 * 120,
  // revalidate: 1,
});

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const postData = await getCachedPost(params.id);
  if (!postData.exists)
    return {
      title: "Post tidak tersedia",
      robots: {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
          index: false,
          follow: false,
          noimageindex: true,
          "max-video-preview": -1,
          "max-snippet": -1,
        },
      },
    };

  return {
    title: postData.content && postData.content.title,
    description: postData.content && postData.content.description,
    openGraph: {
      title: postData.content && postData.content.title,
      description: postData.content && postData.content.description,
      locale: "id_ID",
      type: "article",
      publishedTime: toDate(postData.content?.date),
      authors: [postData.content && postData.content.authorDisplayName],
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    twitter: {
      card: "summary_large_image",
      title: postData.content && postData.content.title,
      description: postData.content && postData.content.description,
    },
  };
}
export default async function MDPage({ params }: { params: { id: string } }) {
  const postData = await getPost(params.id);
  console.log(params);
  if (!postData.exists) return notFound();
  const dateString = postData.content?.date ?? "";
  const date = parseISO(dateString);

  return (
    <article className="select-text p-4 md:py-16 md:px-40 max-w-[1280px] mx-auto transition-[padding]">
      {postData.content?.title && (
        <Typography fontWeight="bold" component="h1" className="text-4xl">
          {postData.content.title}
        </Typography>
      )}
      {postData.content?.date && (
        <Typography>
          {<time dateTime={dateString}>{format(date, "d LLLL yyyy")}</time>}
        </Typography>
      )}
      {postData.content?.authorID && postData.content?.authorDisplayName && (
        <Typography>
          Ditulis oleh {postData.content.authorDisplayName}
        </Typography>
      )}
      <ShareButton />
      <main>
        {postData.content?.contentReact && postData.content.contentReact}
      </main>
      <ProtectedHiddenDevelopmentComponent>
        <br />
        <br />
        <br />
        <br />
        <details>
          <summary>Debug Info</summary>
          <pre style={{ whiteSpace: "break-spaces", wordWrap: "break-word" }}>
            {JSON.stringify(postData, null, 2)}
          </pre>
        </details>
      </ProtectedHiddenDevelopmentComponent>
    </article>
  );
}
