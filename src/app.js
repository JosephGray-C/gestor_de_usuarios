import express from "express";
import cors from "cors";
import morgan from "morgan";
import * as path from 'path'
import { fileURLToPath } from "url";

import usersRoutes from "./routes/users.routes.js";
import vacacionesRoutes from "./routes/vacaciones.routes.js";

const app = express();

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));  // Specify the views folder

app.use(express.static(__dirname + "/public"))

app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use("/api", usersRoutes);
app.use("/api", vacacionesRoutes);

export default app;
