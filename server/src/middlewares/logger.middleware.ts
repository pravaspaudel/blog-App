import type { NextFunction, Request, Response } from "express";

const logger = (req: Request, res: Response, next: NextFunction) => {
  const now = new Date();

  const time = now.toLocaleTimeString();

  console.log(`${time} ${req.method} - ${req.url}`);
  next();
};

export default logger;
