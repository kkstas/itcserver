import { NextFunction, Request, Response } from "express";
// Error handling Middleware functions
const errorLogger = (
  error: Error,
  _request: Request,
  _response: Response,
  next: NextFunction
) => {
  console.log(`error ${error.message}`);
  next(error); // calling next middleware
};

const errorResponder = (
  _request: Request,
  response: Response,
  _next: NextFunction
) => {
  response.header("Content-Type", "application/json");

  const status = 400;
  response.status(status).send(".");
};

const invalidPathHandler = (
  _request: Request,
  response: Response,
  _next: NextFunction
) => {
  response.status(400);
  response.send("invalid path");
};

export { errorLogger, errorResponder, invalidPathHandler };
