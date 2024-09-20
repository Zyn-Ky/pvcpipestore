import { existsSync } from "fs";
import { readdir, readFile } from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { compileMDX } from "next-mdx-remote/rsc";
import { ReactElement } from "react";
import components from "@/components/custom/MDRender/components";
import AdminFirebaseApp from "../firebase/adminConfig";
import { getAuth } from "firebase-admin/auth";

const postsDirectory = path.join(process.cwd(), "src", "posts");

export async function getPost(
  postid: string,
  authToken?: string
): Promise<{
  exists: boolean;
  isPrivate: boolean;
  isPrivateButAccessible: boolean;
  error?: any;
  content: null | {
    id: string;
    contentHtml: string | null;
    contentReact: ReactElement | null;
    [key: string]: any;
  };
}> {
  const auth = getAuth(AdminFirebaseApp);

  let decidedFilepath = "";

  const assumedMDXFilepath = path.join(
    postsDirectory,
    `${decodeURIComponent(postid)}.mdx`
  );
  const assumedMDFilepath = path.join(
    postsDirectory,
    `${decodeURIComponent(postid)}.md`
  );
  const MDXFileExists = existsSync(assumedMDXFilepath);
  const MDFileExists = existsSync(assumedMDFilepath);
  if (MDXFileExists) decidedFilepath = assumedMDXFilepath;
  if (MDFileExists) {
    decidedFilepath = assumedMDFilepath;
  }
  if (MDXFileExists && MDFileExists) {
    decidedFilepath = assumedMDXFilepath;
  }
  if (!MDFileExists && !MDXFileExists) {
    return {
      exists: false,
      content: null,
      isPrivate: false,
      isPrivateButAccessible: false,
    };
  }
  const file = await readFile(decidedFilepath, "utf8");
  const matterResult = matter(file);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  const { content, frontmatter } = await compileMDX<{ title: string }>({
    source: file,
    options: { parseFrontmatter: true },
    components,
  });
  const postIsPrivate = matterResult.data.hidden === "true";
  try {
    const authUsingToken =
      (await auth.verifyIdToken(authToken ?? "")).uid ===
      matterResult.data.authorID;
    if (postIsPrivate) {
      if (authUsingToken) {
        return {
          exists: true,
          isPrivate: true,
          isPrivateButAccessible: true,
          content: {
            id: postid,
            contentHtml,
            contentReact: content,
            ...matterResult.data,
          },
        };
      } else {
        return {
          exists: true,
          isPrivate: true,
          isPrivateButAccessible: false,
          content: {
            id: postid,
            contentHtml: null,
            contentReact: null,
            ...matterResult.data,
          },
        };
      }
    } else {
      return {
        exists: true,
        isPrivate: false,
        isPrivateButAccessible: false,
        content: {
          id: postid,
          contentHtml,
          contentReact: content,
          ...matterResult.data,
        },
      };
    }
  } catch (e) {
    if (postIsPrivate) {
      return {
        exists: true,
        isPrivate: true,
        isPrivateButAccessible: false,
        content: {
          id: postid,
          contentHtml: null,
          contentReact: null,
          ...matterResult.data,
        },
      };
    } else {
      return {
        exists: true,
        isPrivate: false,
        error: e,
        isPrivateButAccessible: false,
        content: {
          id: postid,
          contentHtml,
          contentReact: content,
          ...matterResult.data,
        },
      };
    }
  }
}

export async function getDateSortedPostsData() {
  // Get file names under /src/posts
  const fileNames = await readdir(postsDirectory);
  const allPostsData: { id: string; [key: string]: string & any }[] =
    await Promise.all(
      fileNames.map(async (fileName) => {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, "").replace(/\.mdx$/, "");

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = await readFile(fullPath, "utf8");

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        // Combine the data with the id
        return {
          id,
          ...matterResult.data,
        };
      })
    );
  // Sort posts by date
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}
