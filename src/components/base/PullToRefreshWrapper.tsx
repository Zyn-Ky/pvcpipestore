"use client";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";
import PullToRefresh from "react-simple-pull-to-refresh";

export default function PullToRefreshWrapper(props: PropsWithChildren) {
  const { refresh } = useRouter();

  return (
    <>
      <PullToRefresh
        onRefresh={async () => {
          refresh();
        }}
      >
        <main id="content_ui" role="main">
          {props.children && props.children}
        </main>
      </PullToRefresh>
    </>
  );
}
