import { PropsWithChildren } from "react";

export function IsDisabledOnProduction() {
  return process.env.BUILD_STATE === "production";
}

export default function ProtectedHiddenDevelopmentComponent(
  props: PropsWithChildren
) {
  return process.env.BUILD_STATE === "production" ? (
    <></>
  ) : (
    props.children && props.children
  );
}
