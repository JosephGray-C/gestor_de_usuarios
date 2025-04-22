import { Router } from "express";
import {
  getPerfil,
  postSolitudCambioRol,
} from "../controllers/perfil.controller.js";

import { verificarSesion } from "../middlewares/auth.js";

const router = Router();

router.get("/", verificarSesion, getPerfil);  
router.post("/", verificarSesion, postSolitudCambioRol);

export default router;