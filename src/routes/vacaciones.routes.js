import { Router } from "express";
import {
  getVacaciones,
  postAceptarVacacion,
  postRechazarVacacion,
  postSolicitarVacacion,
  getSolicitarVacacion,
  getMisVacaciones,
  getGestorVacaciones 
} from "../controllers/vacaciones.controller.js";

import { verificarSesion } from "../middlewares/auth.js";

const router = Router();

router.get("/vacaciones",verificarSesion, getVacaciones);

router.get("/vacaciones/misVacaciones",verificarSesion, getMisVacaciones);

router.get("/vacaciones/solicitar",verificarSesion, getSolicitarVacacion);

router.post("/vacaciones/solicitar",verificarSesion, postSolicitarVacacion);

router.get("/vacaciones/gestor",verificarSesion, getGestorVacaciones);

router.post("/vacaciones/aceptar",verificarSesion, postAceptarVacacion);

router.post("/vacaciones/rechazar",verificarSesion, postRechazarVacacion);

export default router; 