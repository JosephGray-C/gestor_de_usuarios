import { Router } from "express";
import {
  getLogin,
  postLogin
} from "../controllers/login.controller.js";

import { verificarSesion } from "../middlewares/auth.js";

const router = Router();

router.get("/", getLogin);  
router.post("/", postLogin);

export default router;