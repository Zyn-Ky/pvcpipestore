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

// function VerifyCSRFToken(req: NextRequest) {}

export const middleware = (req: NextRequest) => {
  // if (req.nextUrl.pathname.startsWith("/api/")) {
  // VerifyCSRFToken(req);
  // }
  return csrfMiddleware(req);
};
