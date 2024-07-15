"use client";
import { PropsWithChildren } from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export default function NProgressWrapper(props: PropsWithChildren) {
  return (
    <div id="root">
      {props.children && props.children}
      <ProgressBar
        height="2px"
        color="#ff0000"
        options={{ showSpinner: true }}
        shallowRouting
      />
    </div>
  );
}
