import { Router } from "express";
import {
  getUsers,
  createNewUser,
  getUserById,
  deleteUserById,
  getTotalUsers,
  updateUserById,
} from "../controllers/users.controller.js";

const router = Router();

router.get("/users", getUsers);

router.post("/users", createNewUser);

router.get("/users/count", getTotalUsers);

router.get("/users/:id", getUserById);

router.delete("/users/:id", deleteUserById);

router.put("/users/:id", updateUserById);

export default router;
