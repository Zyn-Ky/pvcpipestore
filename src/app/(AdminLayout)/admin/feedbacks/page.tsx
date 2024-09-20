"use client";

import InfiniteCircularProgress from "@/components/InfiniteCircularProgress";
import SITE_BACKEND_CONFIG, { StoredFeedbackInfo } from "@/libs/config";
import { firebaseApp } from "@/libs/firebase/config";
import { Close, DeleteForever } from "@mui/icons-material";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CircularProgress,
  Collapse,
  Grid,
  Grid2,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
} from "firebase/firestore";
import Link from "next/link";
import { MouseEvent, useEffect, useState } from "react";
import { useDocument, useCollection } from "react-firebase-hooks/firestore";
import { useHash } from "react-use";

export default function FeedbacksList() {
  const [value, dataLoading, dataError] = useCollection(
    collection(
      getFirestore(firebaseApp),
      SITE_BACKEND_CONFIG.FIRESTORE_FEEDBACKS_ROOT_PATH
    )
  );
  const [hash, setHash] = useHash();
  const parsedItem = value?.docs.map((item) => {
    const { DebugJSLog, SystemDevInfo, ...data } =
      item.data() as StoredFeedbackInfo;
    const id = item.id;
    try {
      const JSLog = JSON.parse(DebugJSLog);
      const DevInfo = JSON.parse(SystemDevInfo);
      return { DebugJSLog: JSLog, SystemDevInfo: DevInfo, ...data, id };
    } catch {
      return { ...data, DebugJSLog, SystemDevInfo, id };
    }
  });
  const openedItem = parsedItem?.filter(
    (item) =>
      item.id ===
      (hash.indexOf("#USER_FEEDBACK+") !== 1 ? hash.split("+")[1] : "")
  );
  async function DeleteFeedback(id: string) {
    if (!id) return false;
    try {
      await deleteDoc(
        doc(
          getFirestore(firebaseApp),
          SITE_BACKEND_CONFIG.FIRESTORE_FEEDBACKS_ROOT_PATH,
          id
        )
      );
      alert("Feedback Deleted");
      return true;
    } catch {
      return false;
    }
  }
  function UpdateHash(e: MouseEvent<HTMLAnchorElement, Event>) {
    e.preventDefault();
    const href = e.currentTarget.href;
    const url = new URL(href);
    setHash(url.hash);
  }
  return (
    <>
      {dataLoading ? (
        <InfiniteCircularProgress />
      ) : (
        <>
          {dataError && <p>An error occured! Please refresh page</p>}
          <Typography variant="h3" component="h1" gutterBottom>
            Feedbacks
          </Typography>
          <Collapse
            in={
              Boolean(openedItem) &&
              typeof openedItem?.length !== "undefined" &&
              openedItem.length > 0
            }
            orientation="vertical"
            mountOnEnter
            unmountOnExit
          >
            <div>
              <Tooltip title="Close">
                <IconButton onClick={() => setHash("")}>
                  <Close />
                </IconButton>
              </Tooltip>
              {openedItem &&
                openedItem.map((item) => (
                  <Tooltip title="Delete" key={item.id}>
                    <IconButton
                      onClick={() => {
                        setHash("");
                        DeleteFeedback(item.id);
                      }}
                    >
                      <DeleteForever />
                    </IconButton>
                  </Tooltip>
                ))}
              {openedItem &&
                openedItem.map((item) => (
                  <div key={item.id}>
                    <p>Title: {item.Title}</p>
                    <p>
                      Email:{" "}
                      <a
                        href={`mailto:${item.Email}`}
                        className="text-blue-700"
                      >
                        {item.Email}
                      </a>
                    </p>
                    <p>IP Address: {item.IPAddress}</p>
                    <p>Form Type: {item.FormType}</p>
                    <p>User: {item.LinkedUID}</p>
                    <details>
                      <summary>Description</summary>
                      <p
                        style={{
                          whiteSpace: "break-spaces",
                          maxHeight: "30vh",
                          overflow: "auto",
                          userSelect: "text",
                        }}
                      >
                        {item.Description}
                      </p>
                    </details>
                    <details>
                      <summary>Device Info</summary>
                      <pre
                        style={{
                          whiteSpace: "break-spaces",
                          maxHeight: "30vh",
                          overflow: "auto",
                          userSelect: "text",
                        }}
                      >
                        {JSON.stringify(item.SystemDevInfo, null, 2)}
                      </pre>
                    </details>
                    <details>
                      <summary>JSLog</summary>
                      <pre
                        style={{
                          whiteSpace: "break-spaces",
                          maxHeight: "30vh",
                          overflow: "auto",
                          userSelect: "text",
                        }}
                      >
                        {JSON.stringify(item.DebugJSLog, null, 2)}
                      </pre>
                    </details>
                  </div>
                ))}
            </div>
          </Collapse>
          <Collapse
            in={!Boolean(openedItem) || openedItem?.length === 0}
            orientation="vertical"
            mountOnEnter
            unmountOnExit
          >
            <Grid2
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
              gap={2}
              className="justify-center items-center mt-4"
            >
              {parsedItem?.map((item) => (
                <Grid2
                  component="div"
                  width={300}
                  key={item.id}
                  gap={2}
                  className="justify-center items-center"
                  // size={{ xs: 2, sm: 4, md: 4 }}
                >
                  <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea
                      LinkComponent={Link}
                      href={`#USER_FEEDBACK+${item.id}`}
                      onClick={UpdateHash}
                    >
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {item.Title && item.Title}
                        </Typography>
                        {item.Description && (
                          <Typography
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                            className="line-clamp-3"
                          >
                            {item.Description}
                          </Typography>
                        )}
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Tooltip title="Delete">
                        <IconButton
                          color="primary"
                          onClick={() => DeleteFeedback(item.id)}
                        >
                          <DeleteForever />
                        </IconButton>
                      </Tooltip>
                    </CardActions>
                  </Card>
                </Grid2>
              ))}
            </Grid2>
          </Collapse>
        </>
      )}
    </>
  );
}
