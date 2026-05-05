import jwt, { type JwtPayload } from "jsonwebtoken";
import type { CookieOptions, Response } from "express";
import { ENV } from "../config/env.config";
import type { TokenType } from "../types/user.type";

const COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  sameSite: "strict",
  path: "/",
  maxAge: 24 * 60 * 60 * 1000,
};

const deleteCookie = (res: Response) => {
  res.clearCookie("token", COOKIE_OPTIONS);
};

const createTokenandsetCookie = (res: Response, userDetails: TokenType) => {
  const token = jwt.sign(userDetails, ENV.JWT_SECRET, { expiresIn: "1d" });
  res.cookie("token", token, COOKIE_OPTIONS);
  return token;
};

const decodeToken = (token: string): JwtPayload => {
  const decoded = jwt.verify(token, ENV.JWT_SECRET) as JwtPayload;
  console.log("decoded from validateToken: ", decoded);
  return decoded;
};

export { createTokenandsetCookie, decodeToken, deleteCookie };
