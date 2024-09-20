// middleware.ts

import { createCsrfMiddleware } from "@edge-csrf/nextjs";
import { NextRequest, NextResponse } from "next/server";

// initalize csrf protection middleware
const csrfMiddleware = createCsrfMiddleware({
  cookie: {
    secure: process.env.NODE_ENV === "production",
    name: "_csrf_x",
  },
});

const RedirectPaths = [
  {
    from: "/go-help-manage-my-account",
    to: "/help/articles/panduan-akun",
  },
];
// function VerifyCSRFToken(req: NextRequest) {}

export const middleware = (req: NextRequest) => {
  const filteredPath = RedirectPaths.filter(
    (val) => val.from === req.nextUrl.pathname
  );
  const isInRedirectMode = filteredPath.length > 0;
  if (isInRedirectMode) {
    return NextResponse.redirect(new URL(filteredPath[0].to, req.url));
  }
  return csrfMiddleware(req);
};
