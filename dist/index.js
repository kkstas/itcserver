"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// router imports
const mainRouter_1 = __importDefault(require("./routes/mainRouter"));
// middleware imports
const error_handling_middleware_1 = require("./middleware/error-handling-middleware");
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(mainRouter_1.default);
app.use(error_handling_middleware_1.errorLogger);
app.use(error_handling_middleware_1.errorResponder);
app.use(error_handling_middleware_1.invalidPathHandler);
app.listen(PORT, () => console.log(`Server działa na porcie ${PORT}`));
