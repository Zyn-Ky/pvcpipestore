import { GetProductUrl } from "@/components/paths";
import {
  ALGOLIA_INDICES,
  StoredProductCardInfo,
  StoredSearchRecordItem,
} from "@/libs/config";
import algoliasearch from "algoliasearch";

const search = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID ?? "",
  process.env.SECURED_ALGOLIA_APP_KEY ?? ""
);

function truncate(str: string, no_words: number) {
  // Split the input string into an array of words using the space character (" ") as the delimiter, then extract a portion of the array containing the specified number of words using the splice method, and finally join the selected words back into a single string with spaces between them
  return str.split(" ").splice(0, no_words).join(" ");
}

export async function UpdateNewProductIndex(
  productItem: StoredProductCardInfo[]
) {
  try {
    const client = search.initIndex(ALGOLIA_INDICES.PRODUCTS);
    const data: StoredSearchRecordItem[] = productItem
      .filter((item) => Boolean(item.UrlID) && typeof item.Name !== "undefined")
      .map((item) => ({
        primaryTitle: item.Name || "",
        relativeUrl: GetProductUrl(item.UrlID || ""),
        shortDescription: truncate(item.Description ?? "", 50),
        type: "PRODUCT",
      }));
    const submitedData = await client.saveObjects(data, {
      autoGenerateObjectIDIfNotExist: true,
    });
    console.log(data, submitedData);

    return {
      success: true,
      submitedData,
    };
  } catch {
    return {
      success: false,
    };
  }
}
