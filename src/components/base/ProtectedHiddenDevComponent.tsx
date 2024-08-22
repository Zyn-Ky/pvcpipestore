import { PropsWithChildren } from "react";

export function IsDisabledOnProduction() {
  return process.env.NODE_ENV === "production";
}

export default function ProtectedHiddenDevelopmentComponent(
  props: PropsWithChildren
) {
  return process.env.NODE_ENV === "production" ? (
    <></>
  ) : (
    props.children && props.children
  );
}
