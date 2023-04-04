import express from "express";
import { pdfController } from "../controllers/pdf-controller";
import { alwaysOk } from "../controllers/always-ok"

const router = express.Router();

// always 200 ok
router.route("/d9fklnsjh843iunuifkj").get(alwaysOk);
router.route("/").get(pdfController);

export default router;
