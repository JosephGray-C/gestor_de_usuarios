import express from "express";
import cors from "cors";
import morgan from "morgan";
import * as path from 'path'
import { fileURLToPath } from "url";
import session from 'express-session'

import usuariosRoutes from "./routes/usuarios.routes.js";
import vacacionesRoutes from "./routes/vacaciones.routes.js";
import loginRoutes from "./routes/login.routes.js";
import registroRoutes from "./routes/registro.routes.js";
import cerrarSesion from "./routes/cerrarSesion.routes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));  
app.use(express.static(__dirname + "/public"))

app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    session({
        secret : 'gestor de usuarios',
        saveUninitialized : false,
        resave : false,
        cookie : {
            maxAge : 60000 * 60,
        }
    })
);

app.use(express.urlencoded({ extended: true }));

app.use("/api", usuariosRoutes);
app.use("/api", vacacionesRoutes);

app.use('/login', loginRoutes);
app.use('/cerrarSesion', cerrarSesion)
app.use('/registro', registroRoutes)

export default app;
