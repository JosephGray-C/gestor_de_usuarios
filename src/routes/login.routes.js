import { Router } from "express";
import {
  getLogin,
} from "../controllers/login.controller.js";

const router = Router();

router.get("/", getLogin);

export default router;