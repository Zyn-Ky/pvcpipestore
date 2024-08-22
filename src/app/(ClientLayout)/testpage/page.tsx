"use client";
import { useGeneralFunction } from "@/components/base/GeneralWrapper";
import { RedirectLoginPage } from "@/components/paths";
import { AxiosFetchV1Api } from "@/libs/axios";
import { FirebaseAuth } from "@/libs/firebase/config";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  Configure,
  Highlight,
  Hits,
  HitsProps,
  InstantSearch,
  SearchBox,
} from "react-instantsearch";
import { Hit as AlgoliaHit } from "instantsearch.js";
import algoliasearch from "algoliasearch";
import "instantsearch.css/themes/satellite.css";
import { StoredSearchRecordItem } from "@/libs/config";

const searchClient = algoliasearch(
  "8JTN8AXH6R",
  "223489da85af51793344fc6438e64c57"
);
type HitProps = {
  hit: AlgoliaHit<StoredSearchRecordItem>;
};

const Search = () => {
  return (
    <InstantSearch searchClient={searchClient} indexName="Untitled-1">
      <Configure hitsPerPage={5} enablePersonalization />
      <div className="ais-InstantSearch">
        <SearchBox />
        <Hits
          hitComponent={({ hit }: HitProps) => (
            <article>
              <a href={hit.relativeUrl}>
                <div className="hit-primaryTitle">
                  <Highlight attribute="primaryTitle" hit={hit} />
                </div>
                <div className="hit-shortDescription">
                  <Highlight attribute="shortDescription" hit={hit} />
                </div>
                <div className="hit-type">
                  <Highlight attribute="type" hit={hit} />
                </div>
              </a>
            </article>
          )}
        />
      </div>
    </InstantSearch>
  );
};
export default function XTest() {
  const [user, loading, error] = useAuthState(FirebaseAuth);
  const { apiManager } = useGeneralFunction();
  const router = useRouter();

  const pathname = usePathname();
  async function ApplyAdmin() {
    if (user === null || typeof user === "undefined") {
      router.push(RedirectLoginPage(pathname));
      return;
    }
    AxiosFetchV1Api(
      "POST",
      "admin/vBeta/applysellerrole",
      apiManager.xsrfToken,
      { authToken: await user.getIdToken() }
    );
  }
  async function RevokeAllRole() {
    if (user === null || typeof user === "undefined") {
      router.push(RedirectLoginPage(pathname));
      return;
    }
    AxiosFetchV1Api(
      "DELETE",
      "admin/vBeta/applysellerrole",
      apiManager.xsrfToken,
      { authToken: await user.getIdToken() }
    );
  }
  return (
    <>
      <h1>Apply as a seller</h1>
      <button
        onClick={() => {
          ApplyAdmin();
        }}
      >
        Apply
      </button>
      <Search />
    </>
  );
}
