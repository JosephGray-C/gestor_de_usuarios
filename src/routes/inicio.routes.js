import { Router } from "express";
import {
  getInicio
} from "../controllers/inicio.controller.js";

import { verificarSesion } from "../middlewares/auth.js";

const router = Router();

router.get("/", verificarSesion, getInicio);  
// router.post("/", );

export default router;