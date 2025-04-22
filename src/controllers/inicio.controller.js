import { getConnection, sql } from "../database/connection.js";
import { sesionUsuario } from "../public/js/sesionUsuario.js";
import url from "url";

export const getInicio = async (req, res) => {
  try {

    const mensaje = req.query.msg;

    const datos = req.query.data;

    return res.render("inicio", 
      { 
        msg: mensaje,
        data: datos,
        userRole: req.session.user.id_rol,
      }
    );  
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

