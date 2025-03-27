import { Router } from "express";
import {
  listarVacaciones,
  aceptarVacacion,
  rechazarVacacion,
  createVacaciones,
  solicitarVacacion
} from "../controllers/vacaciones.controller.js";

const router = Router();

router.get("/vacaciones", listarVacaciones);

router.get("/vacaciones/solicitar", solicitarVacacion);

router.get("/vacaciones/crear", createVacaciones);

router.post("/vacaciones/aceptar/:id/:usuario/:motivo", aceptarVacacion);

router.post("/vacaciones/rechazar/:id/:usuario/:motivo", rechazarVacacion);

export default router;