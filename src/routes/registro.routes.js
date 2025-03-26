import { Router } from "express";
import {
  getRegistro,
  postRegistro
} from "../controllers/registro.controller.js";

const router = Router();

router.get("/", getRegistro);
router.post("/", postRegistro);

export default router;