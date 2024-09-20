import ProtectedHiddenDevelopmentComponent from "@/components/base/ProtectedHiddenDevComponent";
import { getPost } from "@/libs/posts";
import { Button, Typography } from "@mui/material";
import { parseISO, format, toDate } from "date-fns";
import { notFound } from "next/navigation";
import { WhatsappShare } from "react-share-kit";
import ShareButton from "./ShareButton";
import { Metadata } from "next";
import { unstable_cache } from "next/cache";
import PopupFatalError from "@/components/PopupFatalError";
import ForceViewPostButton from "./ForceViewPost";
import Link from "next/link";
export const dynamic = "force-dynamic";
const getCachedPost = unstable_cache(getPost, ["FETCH_POST_ITEM"], {
  tags: ["FETCH_POST_ITEM"],
  revalidate:
    process.env.NODE_ENV === "development"
      ? parseInt(
          "1" || process.env.DEVMODE_PRODUCT_DB_CACHE_REVALIDATE_TIME || "300"
        )
      : 60 * 120,
  // revalidate: 1,
});

type PagePostProps = {
  params: { id: string };
  searchParams: {
    force_view_article_for_approved_users?: string;
    force_view_article_error?: string;
    _token?: string;
  };
};

export async function generateMetadata({
  params,
  searchParams,
}: PagePostProps): Promise<Metadata> {
  const postData = await getPost(
    params.id,
    searchParams.force_view_article_for_approved_users === "1"
      ? searchParams._token
      : ""
  );
  if (!postData.exists || postData.content?.hidden === "true")
    return {
      title: "Post not found",
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
      alternates: {
        canonical: postData.content?.alternateURL ?? null,
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
    alternates: {
      canonical: postData.content?.alternateURL ?? null,
    },
  };
}
export default async function MDPage({ params, searchParams }: PagePostProps) {
  const postData = await getPost(
    params.id,
    searchParams.force_view_article_for_approved_users === "1"
      ? searchParams._token
      : ""
  );
  if (
    postData.error &&
    postData.error?.code !== "auth/argument-error" &&
    searchParams.force_view_article_error !== "1"
  )
    return (
      <PopupFatalError
        hiddenMessage={JSON.stringify({ params, postData })}
        showLog
        action={
          <>
            {postData.content?.contentReact && (
              <Button LinkComponent={Link} href="?force_view_article_error=1">
                Buka paksa
              </Button>
            )}
          </>
        }
        reportButton
      />
    );
  if (!postData.exists) return notFound();
  if (postData.isPrivate && postData.isPrivateButAccessible === false)
    return (
      <PopupFatalError
        hiddenMessage={JSON.stringify({ params, postData })}
        title="Pesan sistem"
        description="Artikel ini privat. Hubungi penulis jika diperlukan"
        action={<ForceViewPostButton uid={postData.content?.authorID ?? ""} />}
      />
    );

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
      <ShareButton
        title={postData.content?.title ?? ""}
        description={postData.content?.description ?? ""}
      />
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
