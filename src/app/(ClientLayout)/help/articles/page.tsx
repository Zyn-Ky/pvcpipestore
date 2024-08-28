import ProtectedHiddenDevelopmentComponent from "@/components/base/ProtectedHiddenDevComponent";
import { GeneratePostURL } from "@/components/paths";
import { getDateSortedPostsData } from "@/libs/posts";
import {
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";

export default async function HelpArticlesPage() {
  const articles = await getDateSortedPostsData();
  return (
    <div className="p-4 max-w-[1080px] mx-auto">
      <Typography
        textAlign="center"
        variant="h3"
        component="h1"
        fontWeight="bold"
      >
        Artikel
      </Typography>
      <List className="list-decimal pl-8">
        {articles.map(({ id, date, title }) => (
          <ListItem
            className="list-item"
            key={id}
            component={Link}
            href={GeneratePostURL(id)}
          >
            <ListItemText
              primary={`${title} | ${date}`}
              className="text-blue-500 visited:text-blue-600"
            />
          </ListItem>
        ))}
      </List>

      <ProtectedHiddenDevelopmentComponent>
        <details>
          <summary>Debug</summary>
          <pre style={{ whiteSpace: "break-spaces", wordWrap: "break-word" }}>
            {JSON.stringify(articles, null, 2)}
          </pre>
        </details>
      </ProtectedHiddenDevelopmentComponent>
    </div>
  );
}
