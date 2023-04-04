import { Request, Response } from "express";

export const alwaysOk = (_req: Request, res: Response) => {
  res.status(200).send("OK");
}
