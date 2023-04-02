import express from "express";
import { pdfController } from "../controllers/pdf-controller";

const router = express.Router();

router.route("/").get(pdfController);

export default router;
