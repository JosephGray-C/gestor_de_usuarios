import { Router } from "express";
import {
  getUsuarios,
  deleteUsuarioById,
  getTotalUsuarios,
} from "../controllers/usuarios.controller.js";

const router = Router();

router.get("/usuarios", getUsuarios);

router.delete("/usuarios/:id", deleteUsuarioById);

router.get("/usuarios/count", getTotalUsuarios);

export default router;
