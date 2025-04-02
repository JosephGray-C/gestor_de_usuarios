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