"use client";

import { useGeneralFunction } from "@/components/base/GeneralWrapper";
import { useLogger } from "@/components/hooks/logger";
import { AxiosFetchV1Api } from "@/libs/axios";
import { StoredFeedbackInfo } from "@/libs/config";
import { FormEvent, PropsWithChildren } from "react";

export default function HelpFormModule(props: PropsWithChildren) {
  const { Console, GetAllLog } = useLogger();
  const { apiManager } = useGeneralFunction();
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
  async function SubmitData(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formProps = Object.fromEntries(formData);
    const data: StoredFeedbackInfo = {
      DebugJSLog: JSON.stringify(GetAllLog()),
      IPAddress: "TO_BE_FILLED",
      Description: (formProps.description as string) ?? "",
      Email: (formProps.user_email as string) ?? "",
      Title: (formProps.form_title as string) ?? "",
      FormType: "SUPPORT_FORM",
      LinkedUID: "Unknown",
      SystemDevInfo: JSON.stringify(GenerateSystemInfo()),
    };
    AxiosFetchV1Api("POST", "client/betaFeedback", apiManager.xsrfToken, {
      ...data,
    });
    Console("log", data);
  }
  return (
    <>
      <form onSubmit={SubmitData} className="text-center">
        {props.children && props.children}
      </form>
    </>
  );
}
