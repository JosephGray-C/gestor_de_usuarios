import { Router } from "express";
import {
  cerrarSesion,
} from "../controllers/cerrarSesion.controller.js";

const router = Router();

router.get("/", cerrarSesion);

export default router;