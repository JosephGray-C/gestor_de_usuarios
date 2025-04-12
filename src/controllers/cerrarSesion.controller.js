import { getConnection, sql } from "../database/connection.js";
import url from 'url';

export const cerrarSesion = async (req, res) => {
  try {
    
    if(!req.session.user || !req.session.id) {

      return res.redirect(
        url.format({
          pathname: "/login",
          query: {
            msg: "Debes iniciar sesión",
            data: {},
          },
        })
      );  

    }

    // const pool = await getConnection();
    
    // const result = await pool
    //   .request()
    //   .input("identificacion", sql.Text, req.body.identificacion)
    //   .input("contrasenia", sql.Text, req.body.contrasenia)
    //   .execute("IniciarSesion");

    // if (result.recordset[0].Status == 'Failed') {            
    //   return res.redirect(
    //     url.format({
    //     pathname: "/login",
    //       query: {
    //         msg: "Contraseña o identificación incorrecta",
    //       },
    //     })
    //   );
    // }
    
    // var usuario = result.recordset[0];

    // console.log(usuario);

    req.session.destroy();
    return res.redirect(
      url.format({
        pathname: "/login",
        query: {
          msg: "Se ha cerrado sesión correctamente",
          data: req.body
        },
      })
    ); 
    
  } catch (error) {

    return res.status(500).send(error.message);

  }
};