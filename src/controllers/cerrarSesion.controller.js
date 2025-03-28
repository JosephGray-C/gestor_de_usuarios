import { getConnection, sql } from "../database/connection.js";
import url from 'url';

export const cerrarSesion = async (req, res) => {
  try {

    console.log(req.session);
    console.log(req.session.id);

    if(req.session.id) {
        req.session.destroy();
        // console.log(req.session.id);
    }

    res.render("login", {msg: "Se ha cerrado sesión correctamente"});

  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};