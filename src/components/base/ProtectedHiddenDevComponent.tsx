import { PropsWithChildren, ReactNode } from "react";

export function IsDisabledOnProduction() {
  return process.env.BUILD_STATE === "production";
}

export default function ProtectedHiddenDevelopmentComponent(
  props: PropsWithChildren<{ fallback?: ReactNode; forceFallback?: boolean }>
) {
  const componentType = typeof window === "undefined" ? "server" : "client";

  const state = IsDisabledOnProduction();
  return state || props.forceFallback
    ? props.fallback && props.fallback
    : props.children && props.children;
}
