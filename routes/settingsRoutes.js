import express from "express";
import { getSiteSettings, updateSiteSettings } from "../controllers/settingsController.js";

const router = express.Router();

router.get("/", getSiteSettings);
router.post("/", updateSiteSettings);

export default router;