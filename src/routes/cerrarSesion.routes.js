import { Router } from "express";
import {
  cerrarSesion,
} from "../controllers/cerrarSesion.controller.js";

import { verificarSesion } from "../middlewares/auth.js";

const router = Router();

router.get("/", verificarSesion, cerrarSesion);

export default router;