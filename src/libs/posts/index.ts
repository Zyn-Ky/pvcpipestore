import { existsSync } from "fs";
import { readdir, readFile } from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { compileMDX } from "next-mdx-remote/rsc";
import { ReactElement } from "react";

const postsDirectory = path.join(process.cwd(), "src", "posts");

export async function getPost(postid: string): Promise<{
  exists: boolean;
  content: null | {
    id: string;
    contentHtml: string;
    contentReact: ReactElement;
    [key: string]: any;
  };
}> {
  const filepath = path.join(postsDirectory, `${postid}.mdx`);
  const exists = existsSync(filepath);
  if (!exists)
    return {
      exists: false,
      content: null,
    };
  const file = await readFile(filepath, "utf8");
  const matterResult = matter(file);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  const { content, frontmatter } = await compileMDX<{ title: string }>({
    source: file,
    options: { parseFrontmatter: true },
  });
  return {
    exists: true,
    content: {
      id: postid,
      contentHtml,
      contentReact: content,
      ...matterResult.data,
    },
  };
}

export async function getDateSortedPostsData() {
  // Get file names under /src/posts
  const fileNames = await readdir(postsDirectory);
  const allPostsData: { id: string; [key: string]: string & any }[] =
    await Promise.all(
      fileNames.map(async (fileName) => {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, "");

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
