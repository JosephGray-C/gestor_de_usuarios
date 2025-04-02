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

const router = Router();

router.get("/vacaciones", getVacaciones);

router.get("/vacaciones/misVacaciones", getMisVacaciones);

router.get("/vacaciones/solicitar", getSolicitarVacacion);

router.post("/vacaciones/solicitar", postSolicitarVacacion);

router.get("/vacaciones/gestor", getGestorVacaciones);

router.post("/vacaciones/aceptar", postAceptarVacacion);

router.post("/vacaciones/rechazar", postRechazarVacacion);

export default router; 