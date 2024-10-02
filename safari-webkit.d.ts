import "react";

declare module "react" {
  interface CSSProperties {
    [key: `-webkit-${string}`]: string | number;
  }
}
