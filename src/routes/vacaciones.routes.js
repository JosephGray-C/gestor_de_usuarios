import { Router } from "express";
import {
  getVacaciones,
  aceptarVacacion,
  rechazarVacacion,
  createVacaciones
} from "../controllers/vacaciones.controller.js";

const router = Router();

router.get("/vacaciones", getVacaciones);

router.get("/vacaciones/crear", createVacaciones)

router.post("/vacaciones/aceptar/:id/:usuario/:motivo", aceptarVacacion);

router.post("/vacaciones/rechazar/:id/:usuario/:motivo", rechazarVacacion);

export default router;