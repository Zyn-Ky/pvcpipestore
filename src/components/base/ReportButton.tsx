"use client";
import { StoredFeedbackInfo } from "@/libs/config";
import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import { useLogger } from "../hooks/logger";
import { useGeneralFunction } from "./GeneralWrapper";
import { useState } from "react";
import { AxiosFetchV1Api } from "@/libs/axios";
function GenerateSystemInfo() {
  const {
    doNotTrack,
    maxTouchPoints,
    onLine,
    language,
    languages,
    pdfViewerEnabled,
    appCodeName,
    appName,
    appVersion,
    vendor,
    vendorSub,
    product,
    productSub,
    platform,
    mimeTypes,
    userAgent,
    hardwareConcurrency,
    cookieEnabled,
  } = navigator;
  const {
    availHeight,
    availWidth,
    colorDepth,
    height,
    orientation,
    pixelDepth,
    width,
  } = screen;

  return {
    doNotTrack,
    maxTouchPoints,
    onLine,
    language,
    languages,
    pdfViewerEnabled,
    appCodeName,
    appName,
    appVersion,
    vendor,
    vendorSub,
    product,
    productSub,
    platform,
    mimeTypes,
    javaEnabled: false,
    userAgent,
    hardwareConcurrency,
    cookieEnabled,
    availHeight,
    availWidth,
    colorDepth,
    height,
    orientation,
    pixelDepth,
    width,
  };
}
export default function ReportButton({
  errorMessage,
}: {
  errorMessage: string;
}) {
  const { GetAllLog, Console } = useLogger();
  const { userManager, apiManager } = useGeneralFunction();
  const [isSending, setIsSending] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  async function SubmitData() {
    if (isFinished) return;
    setIsSending(true);
    const data: StoredFeedbackInfo = {
      DebugJSLog: JSON.stringify(GetAllLog()),
      IPAddress: "TO_BE_FILLED",
      Description: errorMessage,
      Email: userManager.currentUser?.email ?? "",
      Title: `SYSTEM AUTO LOG: ERROR in ${new Date().getTime()}`,
      FormType: "SUPPORT_FORM",
      LinkedUID: "Unknown",
      SystemDevInfo: JSON.stringify(GenerateSystemInfo()),
    };
    await AxiosFetchV1Api("POST", "client/betaFeedback", apiManager.xsrfToken, {
      ...data,
      authToken: await userManager.currentUser?.getIdToken(),
    });
    setIsSending(false);
    setIsFinished(true);
    Console("log", data);
  }
  return (
    <>
      <LoadingButton
        className="ml-2"
        color={isFinished ? "success" : "primary"}
        loading={isSending}
        onClick={() => {
          SubmitData();
        }}
      >
        {isFinished && "Berhasil"}
        {!isFinished && "Kirim log"}
      </LoadingButton>
    </>
  );
}
