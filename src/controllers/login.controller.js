import { getConnection, sql } from "../database/connection.js";
import { sesionUsuario } from "../public/js/sesionUsuario.js";

import url from "url";

export const getLogin = async (req, res) => {
  try {

    const mensaje = req.query.msg;

    const datos = req.query.data;

    return res.render("login", 
      { 
        msg: mensaje,
        data: datos 
      }
    );  
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const postLogin = async (req, res) => {
  try {

    console.log(req.body)
    
    if (!req.body.identificacion || !req.body.contrasenia) {
      return res.redirect(
        url.format({
          pathname: "/login",
          query: {
            msg: "Por favor, ingrese todos los datos solicitados.",
            data: req.body
          },
        })
      );
    }

    const pool = await getConnection();

    const result = await pool
      .request()
      .input("identificacion", sql.Text, req.body.identificacion)
      .input("contrasenia", sql.Text, req.body.contrasenia)
      .execute("IniciarSesion");

    if (result.recordset[0].Status == 'Failed') {            
      return res.redirect(
        url.format({
        pathname: "/login",
          query: {
            msg: "Contraseña o identificación incorrecta",
          },
        })
      );
    }
    
    var usuario = result.recordset[0];

    console.log(usuario);

    const usuarioSesion = await  sesionUsuario(req, res, usuario);
    if (!usuarioSesion) return;

    return res.redirect(
      url.format({
        pathname: "/api/vacaciones",
        query: {
          msg: "Se ha iniciado sesión correctamente",
        },
      })
    );
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
