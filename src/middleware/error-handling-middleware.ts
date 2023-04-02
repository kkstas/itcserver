import { NextFunction, Request, Response } from "express";
// Error handling Middleware functions
const errorLogger = (
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction
) => {
    console.log(`error ${error.message}`);
    next(error); // calling next middleware
};

const errorResponder = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    response.header("Content-Type", "application/json");

    const status = 400;
    response.status(status).send(".");
};

const invalidPathHandler = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    response.status(400);
    response.send("invalid path");
};

export { errorLogger, errorResponder, invalidPathHandler };
