import { PropsWithChildren, ReactNode } from "react";

export function IsDisabledOnProduction() {
  return process.env.BUILD_STATE === "production";
}

export default function ProtectedHiddenDevelopmentComponent(
  props: PropsWithChildren<{ fallback?: ReactNode; forceFallback?: boolean }>
) {
  return process.env.BUILD_STATE === "production" || props.forceFallback
    ? props.fallback && props.fallback
    : props.children && props.children;
}
