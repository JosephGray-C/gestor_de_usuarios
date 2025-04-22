import { getConnection, sql } from "../database/connection.js";
import url from "url";
import { sendMail } from "../public/js/sender.js";  

export const getPerfil = async (req, res) => {
  try {

    const mensaje = req.query.msg;
    const datos = req.query.data;

    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id_usuario", sql.Int, req.session.user.id_usuario)
      .execute("Perfil");

    var usuario = result.recordset[0];
    
    const result2 = await pool
      .request()
      .query("SELECT * FROM Vista_Roles");

    var roles = result2.recordset;

    return res.render("perfil", 
      { 
        msg: mensaje,
        data: datos,
        userRole: req.session.user.id_rol,
        usuario: usuario,
        roles: roles,
      }
    );  

  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const postSolitudCambioRol = async (req, res) => {

  try {
    
    if (!req.body.id_rol || !req.body.id_usuario) {
      return res.redirect(
        url.format({
          pathname: "perfil",
          query: {
            msg: "Por favor, ingrese todos los datos solicitados.",
            data: req.body
          },
        })
      ); 
    }

    sendMail(req.body.correo,"Solicitud de cambio de rol", "El usuario " + req.body.nombre + " con identificacion " + req.body.identificacion + " ha solicitado un cambio de rol. Por favor, revise la solicitud.");     

    return res.redirect(
      url.format({
        pathname: "/perfil",
        query: {
          msg: "Su solicitud ha sido enviada correctamente.",
        },
      })
    );

  } catch (error) {
    return res.status(500).send(error.message);
  }
};



