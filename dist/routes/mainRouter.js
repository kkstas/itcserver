"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pdf_controller_1 = require("../controllers/pdf-controller");
const router = express_1.default.Router();
router.route("/").get(pdf_controller_1.pdfController);
exports.default = router;
