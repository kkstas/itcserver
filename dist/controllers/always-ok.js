"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alwaysOk = void 0;
const alwaysOk = (_req, res) => {
    res.status(200).send("OK");
};
exports.alwaysOk = alwaysOk;
