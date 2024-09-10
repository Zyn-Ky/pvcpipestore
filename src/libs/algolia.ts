import algoliasearch from "algoliasearch";

const publicSearchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID ?? "",
  process.env.NEXT_PUBLIC_ALGOLA_APP_KEY ?? ""
);

export default publicSearchClient;
