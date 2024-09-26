import ProtectedHiddenDevelopmentComponent from "@/components/base/ProtectedHiddenDevComponent";
import GoBackButton from "@/components/GoBackButton";
import { GeneratePostURL } from "@/components/paths";
import { getDateSortedPostsData } from "@/libs/posts";
import { Share } from "@mui/icons-material";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid2,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { DynamicParamTypes } from "next/dist/server/app-render/types";
import Link from "next/link";
import ShareButton from "./ShareButton";

export const metadata: Metadata = { title: "Artikel" };

export default async function HelpArticlesPage() {
  const articles = await getDateSortedPostsData();
  return (
    <div className="p-4 max-w-[1080px] mx-auto">
      <GoBackButton />
      <Typography
        textAlign="center"
        variant="h3"
        component="h1"
        fontWeight="bold"
      >
        Artikel
      </Typography>
      <Grid2
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        gap={2}
        className="justify-center items-start mt-4"
      >
        {articles.map(({ id, date, title, description }, i) => (
          <Grid2
            component="div"
            width={300}
            key={id ?? i}
            gap={2}
            className="justify-center items-start"
            // size={{ xs: 2, sm: 4, md: 4 }}
          >
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea LinkComponent={Link} href={GeneratePostURL(id)}>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    fontWeight="bold"
                    component="h1"
                  >
                    {title && title}
                  </Typography>
                  {description && (
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                      className="line-clamp-3"
                    >
                      {description}
                    </Typography>
                  )}
                </CardContent>
              </CardActionArea>
              <CardActions>
                <ShareButton data={{ id, date, title, description }} />
              </CardActions>
            </Card>
          </Grid2>
        ))}
      </Grid2>
      {/* <List className="list-decimal pl-8">
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
      </List> */}

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
