"use client";
import {
  Button,
  CircularProgress,
  InputAdornment,
  Portal,
  Skeleton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { css } from "@emotion/css";
import {
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDebounce, useKey, useKeyPress, useUpdateEffect } from "react-use";
import SearchIcon from "@mui/icons-material/Search";
import {
  SearchButtonProvider,
  SearchModal,
  srchBtnContext,
} from "./base/SearchAnimated";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import {
  Index,
  SearchBox,
  useHits,
  useInstantSearch,
  useSearchBox,
  UseSearchBoxProps,
} from "react-instantsearch";
import ProtectedHiddenDevelopmentComponent from "./base/ProtectedHiddenDevComponent";
import FocusTrap from "@mui/material/Unstable_TrapFocus/FocusTrap";
import { useAutocomplete } from "./hooks/algolia";
import { ALGOLIA_INDICES } from "@/libs/config";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SearchButtonProps {
  searchProps?: UseSearchBoxProps;
  indexes: string[];
}

const ANIM_DURATION = 0.45;
const ANIM_DURATION_IN_MS = ANIM_DURATION * 1000;
interface ItemResultProps {
  thumbnailURL?: string;
  loading?: boolean;
  primaryTitle?: string;
  relativeURL?: string;
  shortDescription?: string;
}
interface GroupItemProps {
  title?: string;
  loading?: boolean;
}
function ItemResult({
  loading,
  thumbnailURL,
  primaryTitle,
  relativeURL,
  shortDescription,
}: ItemResultProps) {
  return (
    <>
      <Link href={relativeURL ?? ""} className="flex gap-4">
        {loading && (
          <Skeleton
            variant="rectangular"
            animation="wave"
            className="hidden sm:block"
            width={128}
            height={128}
          />
        )}
        {/* {thumbnailURL && <></>} */}
        <div className="flex-1">
          {loading ? (
            <>
              <Skeleton variant="text" sx={{ fontSize: "1.25rem" }} />
              <Skeleton variant="text" className="w-7/12" />
              <Skeleton variant="text" className="w-1/2" />
            </>
          ) : (
            <>
              {primaryTitle && (
                <Typography variant="h6" component="h2" fontWeight="bold">
                  {primaryTitle}
                </Typography>
              )}
              {shortDescription && (
                <div
                  dangerouslySetInnerHTML={{ __html: shortDescription }}
                ></div>
              )}
            </>
          )}
        </div>
      </Link>
    </>
  );
}

function GroupItem({
  children,
  title,
  loading,
}: PropsWithChildren<GroupItemProps>) {
  return (
    <>
      <Typography
        variant="h4"
        component="h1"
        className={`${loading && "w-2/5"}`}
        fontWeight="bold"
      >
        {loading ? <Skeleton animation="wave" /> : title && title}
      </Typography>
      <div className="flex flex-col gap-4 md:px-4 my-2">
        {children && children}
      </div>
    </>
  );
}

function AutocompleteResultBox({
  keyword,
  indiceName,
}: {
  keyword: string;
  indiceName: string;
}) {
  const { status, refresh } = useInstantSearch();
  const { currentRefinement, indices, refine } = useAutocomplete({
    escapeHTML: true,
  });
  useEffect(() => {
    refine(keyword);
  }, [keyword]);
  return (
    <>
      <ProtectedHiddenDevelopmentComponent></ProtectedHiddenDevelopmentComponent>
      {status === "loading" ? (
        <GroupItem loading>
          <ItemResult loading />
          <ItemResult loading />
        </GroupItem>
      ) : (
        <>
          {status === "error" ? (
            <>
              <div className="h-32">
                <p>Periksa Koneksi Internet Anda</p>
                <Button
                  onClick={() => {
                    refresh();
                  }}
                >
                  Segarkan
                </Button>
              </div>
            </>
          ) : (
            <>
              {(Boolean(keyword) ? indices : [])
                .filter(
                  (indice) =>
                    indice.indexName === indiceName && indice.hits.length !== 0
                )
                .map(({ indexName, indexId, hits }) => (
                  <GroupItem key={indexId} title={indexName ?? ""}>
                    {hits.map(
                      ({ id, primaryTitle, shortDescription, relativeUrl }) => (
                        <ItemResult
                          key={id ?? ""}
                          primaryTitle={primaryTitle ?? ""}
                          shortDescription={shortDescription}
                          relativeURL={relativeUrl ?? ""}
                        />
                      )
                    )}
                  </GroupItem>
                ))}
            </>
          )}
        </>
      )}
    </>
  );
}

function SearchButton({ searchProps, indexes }: SearchButtonProps) {
  const theme = useTheme();
  const text = useTranslations("BASE");
  const [searchVal, setSearchVal] = useState("");
  const [prevOpenedState, setPrevOpenedState] = useState(false);
  const [isInputEmpty, setIsInputEmpty] = useState(true);
  const [typeOnFocus, setTypeOnFocus] = useState(true);
  const { status, refresh } = useInstantSearch();
  const searchTextInputRef = useRef<HTMLInputElement>(null);
  const { searchButtonRef, triggerSearchButton, opened, finishedAnimating } =
    useContext(srchBtnContext);
  const pathname = usePathname();
  useKey(
    "Escape",
    (event) => {
      console.log(finishedAnimating);
      if (opened && finishedAnimating) {
        console.log(event);
        triggerSearchButton(false);
      }
    },
    { event: "keydown" },
    [opened, finishedAnimating]
  );
  useKey(
    (event) => {
      const filter = ["Escape", "Enter"];
      return !filter.includes(event.key) && typeOnFocus;
    },
    (e) => {
      console.log(e);
      setSearchVal((prev) => prev + e.key);
      if (document.activeElement === searchButtonRef?.current)
        triggerSearchButton(true);
      if (opened) setTypeOnFocus(false);
      // const timeout = setTimeout(() => {
      //   console.log("disable");
      // }, ANIM_DURATION_IN_MS);
    },
    { event: "keypress" },
    [opened, typeOnFocus]
  );
  const buttonStyles = css`
    background-color: ${theme.palette.mode === "dark"
      ? theme.palette.primary.dark
      : theme.palette.primary.main};
    color: ${theme.palette.common.white};
  `;
  const bodyColorStyles = css`
    background-color: ${theme.palette.background.paper};
    color: ${theme.palette.text.primary};
  `;
  const buttonClassnames = `px-8 py-2 flex items-center text-base justify-center gap-3 border-0 cursor-pointer rounded-3xl  ${buttonStyles}`;
  const generateSearchButton = (gimmick?: boolean) => (
    <button
      ref={!gimmick ? searchButtonRef : undefined}
      className={`${buttonClassnames} ${
        gimmick && "mx-0 absolute inset-0 h-full"
      } overflow-hidden will-change-[transform,top,left,width,height,border-radius] z-muiModal`}
      onClick={() => {
        if (!gimmick) triggerSearchButton(true);
      }}
    >
      <SearchIcon />
      {text("SEARCH_TEXT")}
    </button>
  );
  useUpdateEffect(() => {
    const timeout = setTimeout(() => {
      if (opened)
        searchTextInputRef.current && searchTextInputRef.current.focus();
      if (prevOpenedState)
        searchButtonRef &&
          searchButtonRef.current &&
          searchButtonRef.current.focus();
      setPrevOpenedState(opened);
      console.log(opened, searchTextInputRef.current);
    }, ANIM_DURATION_IN_MS);
    return () => {
      clearTimeout(timeout);
    };
  }, [opened]);
  useEffect(() => {
    if (opened === false) {
      setTypeOnFocus(true);
      setSearchVal("");
    }
  }, [opened]);
  useEffect(() => {
    triggerSearchButton(false);
  }, [pathname]);
  return (
    <>
      {generateSearchButton()}
      <Portal
        container={() => document.getElementById("down") ?? document.body}
      >
        <SearchModal
          searchButtonCloneNode={generateSearchButton(true)}
          className={`${bodyColorStyles}`}
          contentProps={{
            className: "p-6 md:p-24 transition-[padding] h-full overflow-auto",
          }}
        >
          <FocusTrap open={opened}>
            <div className="overflow-auto flex flex-col h-full">
              <div>
                <div className="flex justify-end">
                  <Button onClick={() => triggerSearchButton(false)}>
                    Tutup
                  </Button>
                </div>
                <h1 className="text-3xl font-bold">
                  Cari produk dan lain-lainnya
                </h1>
                <TextField
                  label={text("SEARCH_TEXT")}
                  value={searchVal}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  onChange={({ currentTarget }) => {
                    setSearchVal(currentTarget.value);
                    setIsInputEmpty(currentTarget.value.length === 0);
                  }}
                  inputRef={searchTextInputRef}
                  autoFocus
                  size="medium"
                  variant="standard"
                />
              </div>
              <div
                className={`overflow-auto my-2 flex-1 h-full mb-16 ${
                  status === "loading" && "overflow-hidden"
                }`}
              >
                <ProtectedHiddenDevelopmentComponent>
                  {searchVal && <p>Mencari {searchVal}</p>}
                  {status}
                </ProtectedHiddenDevelopmentComponent>
                {indexes.map((val, i) => (
                  <Index indexName={val} key={`SEARCH_INDICE_${i}`}>
                    <AutocompleteResultBox
                      keyword={searchVal}
                      indiceName={val}
                    />
                  </Index>
                ))}
              </div>
            </div>
          </FocusTrap>
        </SearchModal>
      </Portal>
    </>
  );
}

export default function SearchButtonWrapper(props: SearchButtonProps) {
  return (
    <SearchButtonProvider borderRadiusBtn="24px" duration={ANIM_DURATION}>
      <SearchButton {...props} />
    </SearchButtonProvider>
  );
}
