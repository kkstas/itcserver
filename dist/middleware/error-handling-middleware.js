"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidPathHandler = exports.errorResponder = exports.errorLogger = void 0;
// Error handling Middleware functions
const errorLogger = (error, _request, _response, next) => {
    console.log(`error ${error.message}`);
    next(error); // calling next middleware
};
exports.errorLogger = errorLogger;
const errorResponder = (_request, response, _next) => {
    response.header("Content-Type", "application/json");
    const status = 400;
    response.status(status).send(".");
};
exports.errorResponder = errorResponder;
const invalidPathHandler = (_request, response, _next) => {
    response.status(400);
    response.send("invalid path");
};
exports.invalidPathHandler = invalidPathHandler;
