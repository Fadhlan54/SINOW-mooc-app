import { NextResponse } from "next/server";

export default function checkToken(middleware) {
  return async function (req, res) {
    const pathname = req.nextUrl.pathname;
    return middleware(req, res);
  };
}
