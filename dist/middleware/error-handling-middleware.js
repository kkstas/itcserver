"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidPathHandler = exports.errorResponder = exports.errorLogger = void 0;
// Error handling Middleware functions
const errorLogger = (error, request, response, next) => {
    console.log(`error ${error.message}`);
    next(error); // calling next middleware
};
exports.errorLogger = errorLogger;
const errorResponder = (request, response, next) => {
    response.header("Content-Type", "application/json");
    const status = 400;
    response.status(status).send(".");
};
exports.errorResponder = errorResponder;
const invalidPathHandler = (request, response, next) => {
    response.status(400);
    response.send("invalid path");
};
exports.invalidPathHandler = invalidPathHandler;
