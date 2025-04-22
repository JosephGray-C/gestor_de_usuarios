import { Router } from "express";
import {
  getUsuarios,
  getCambioRol,
  postCambioRol
} from "../controllers/usuarios.controller.js";

import { verificarSesion } from "../middlewares/auth.js";

const router = Router();

router.get("/usuarios",verificarSesion, getUsuarios);
router.get("/usuarios/cambiarRol",verificarSesion, getCambioRol);
router.post("/usuarios/cambiarRol",verificarSesion, postCambioRol);

export default router;
