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
          },
        })
      );  

    }
    
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id_usuario", sql.Int, req.session.user.id_usuario)
      .execute("CerrarSesion");

    req.session.destroy((err) => {
      if (err) {
        console.error("Error al destruir la sesión:", err);
        return res.status(500).send("Error al cerrar sesión");
      }
      return res
              .clearCookie("session_id", { path: "/" })
              .redirect(
                url.format({
                  pathname: "/login",
                  query: {
                    msg: "Se ha cerrado sesión correctamente",
                  },
                })); 
    });

  } catch (error) {

    return res.status(500).send(error.message);

  }
};