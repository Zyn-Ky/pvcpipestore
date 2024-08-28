import ProtectedHiddenDevelopmentComponent from "@/components/base/ProtectedHiddenDevComponent";
import { getPost } from "@/libs/posts";
import { Typography } from "@mui/material";
import { parseISO, format } from "date-fns";
import { notFound } from "next/navigation";

export default async function MDPage({ params }: { params: { id: string } }) {
  const postData = await getPost(params.id);
  if (!postData.exists) return notFound();
  const dateString = postData.content?.date ?? "";
  const date = parseISO(dateString);

  return (
    <article className="select-text p-4 md:p-12">
      {postData.content?.title && (
        <Typography variant="h3" fontWeight="bold" component="h1">
          {postData.content.title}
        </Typography>
      )}
      {postData.content?.date && (
        <Typography>
          {<time dateTime={dateString}>{format(date, "d LLLL yyyy")}</time>}
        </Typography>
      )}

      {postData.content?.contentReact && postData.content.contentReact}
      <ProtectedHiddenDevelopmentComponent>
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
