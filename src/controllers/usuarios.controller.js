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

export const getCambioRol = async (req, res) => {

  const sesionValida = await revisarSesion(req, res);
  if (!sesionValida) return;

  try {

    const pool = await getConnection();

    const result = await pool
      .request()
      .query("EXEC ObtenerUsuarios");

    const result2 = await pool
      .request()
      .query("SELECT * FROM Vista_Roles");

    var usuarios = result.recordset;

    var roles = result2.recordset;

    const mensaje = req.query.msg;

    return res.render("cambiarRol", 
      {
        usuarios: usuarios,
        roles: roles,
        msg: mensaje,
        data: {},
      }
    );

  } catch (error) {
   
    return res.status(500).send(error.message);
    
  }
};

export const postCambioRol = async (req, res) => {

  const sesionValida = await revisarSesion(req, res);
  if (!sesionValida) return;

  try {  
      
    console.log(req.body);

    if (!req.body.id_rol || !req.body.id_rol) {
      return res.redirect(
        url.format({
          pathname: "cambiarRol",
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
      .input("id_usuario", sql.Int, req.body.id_usuario)
      .input("id_rol", sql.Int, req.body.id_rol)
      .execute("CambioRol");

    var usuario = result.recordset;
    
    return res.redirect(
      url.format({
        pathname: "/api/usuarios/cambiarRol",
        query: {
          msg: "Se ha cambiado el rol exitosamente",
        },
      })
    );

  } catch (error) {

    return res.status(500).send(error.message);
    
  }
};