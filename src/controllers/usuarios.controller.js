import { getConnection, sql } from "../database/connection.js";
import { revisarSesion } from "../public/js/revisarSesion.js";
import url from 'url';

export const getUsuarios = async (req, res) => {

  revisarSesion(req, res);

  try {

    const pool = await getConnection();

    const result = await pool.request().query("EXEC ObtenerUsuarios");

    var resJSON = result.recordset

    const mensaje = req.query.msg;

    
    res.render("listarUsuarios",
    {
      usuarios: resJSON,
      msg: mensaje,
      data : {}
    });

  } catch (error) {
    res.status(500);

    res.send(error.message);
  }
};


