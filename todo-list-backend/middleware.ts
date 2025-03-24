import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  e: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(`error: ${e}`);
};
