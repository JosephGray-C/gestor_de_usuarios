import { getConnection, sql } from "../database/connection.js";
import url from "url";

export const getRegistro = async (req, res) => {
  try {

    const mensaje = req.query.msg;

    const datos = req.query.data;

    return res.render("registro", 
      {   
        msg: mensaje,
        data: datos
      }
    );
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const postRegistro = async (req, res) => {
  try {

    // console.log(req.body);

    if (!req.body.nombre || !req.body.edad || !req.body.identificacion || !req.body.contrasenia || !req.body.correo) {
      return res.redirect(
        url.format({
          pathname: "/registro",
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
      .input("nombre", sql.Text, req.body.nombre) 
      .input("edad", sql.Int, req.body.edad)
      .input("identificacion", sql.Text, req.body.identificacion)
      .input("contrasenia", sql.Text, req.body.contrasenia)
      .input("correo", sql.Text, req.body.correo)
      .execute("InsertarUsuario");

    // console.log(result.recordset);

    var user = result.recordset[0];

    console.log(user);

    req.session.user = user;

    return res.redirect(
      url.format({
        pathname: "/api/usuarios",
        query: {
          msg: "Usuario creado correctamente",
        },
      })
    );

  } catch (error) {
    return res.status(500).send(error.message);
  }
};
