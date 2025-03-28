import { Router } from "express";
import {
  getVacaciones,
  postAceptarVacacion,
  postRechazarVacacion,
  postCrearVacacion,
  getSolicitarVacacion
} from "../controllers/vacaciones.controller.js";

const router = Router();

router.get("/vacaciones", getVacaciones);

router.get("/vacaciones/solicitar", getSolicitarVacacion);

router.post("/vacaciones/crear", postCrearVacacion);

router.post("/vacaciones/aceptar/:id/:usuario/:motivo", postAceptarVacacion);

router.post("/vacaciones/rechazar/:id/:usuario/:motivo", postRechazarVacacion);

export default router; 