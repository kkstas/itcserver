import express from "express";
import { pdfController } from "../controllers/pdf-controller";
import { alwaysOk } from "../controllers/always-ok";

const router = express.Router();

// custom route for demo
// router.route("/trx/pcashm").get(pdfController);

// always 200 ok
// router.route("/d9fklnsjh843iunuifkj").get(alwaysOk);
router.route("/").get(pdfController);

export default router;
