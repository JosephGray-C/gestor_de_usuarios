import { Router } from "express";
import {
  getUsuarios,
  getCambioRol,
  postCambioRol
} from "../controllers/usuarios.controller.js";

const router = Router();

router.get("/usuarios", getUsuarios);
router.get("/usuarios/cambiarRol", getCambioRol);
router.post("/usuarios/cambiarRol", postCambioRol);

export default router;
