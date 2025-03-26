import express from "express";
import cors from "cors";
import morgan from "morgan";
import * as path from 'path'
import { fileURLToPath } from "url";

import usersRoutes from "./routes/users.routes.js";
import vacacionesRoutes from "./routes/vacaciones.routes.js";
import loginRoutes from "./routes/login.routes.js";
import registroRoutes from "./routes/registro.routes.js";

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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", usersRoutes);
app.use("/api", vacacionesRoutes);


app.use('/login', loginRoutes);
app.use('/registro', registroRoutes)

export default app;
