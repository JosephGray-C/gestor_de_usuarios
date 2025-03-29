import { getConnection, sql } from "../database/connection.js";
import { revisarSesion } from "../public/js/revisarSesion.js";
import url from "url";

export const getUsuarios = async (req, res) => {

  const sesionValida = await revisarSesion(req, res);
  if (!sesionValida) return;

  try {

    const pool = await getConnection();

    const result = await pool
      .request()
      .query("EXEC ObtenerUsuarios");

    var usuarios = result.recordset;

    const mensaje = req.query.msg;

    return res.render("listarUsuarios", 
      {
        usuarios: usuarios,
        msg: mensaje,
        data: {},
      }
    );

  } catch (error) {

    return res.status(500).send(error.message);
    
  }
};
