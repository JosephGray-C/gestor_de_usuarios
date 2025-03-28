import { getConnection, sql } from "../database/connection.js";
import url from 'url';

export const getLogin = async (req, res) => {
    try {

      const mensaje = req.query.msg;
      
      res.render("login", { msg: mensaje, data: {} });

    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

  export const postLogin = async (req, res) => {
    try {

      if (!req.body.identificacion || !req.body.contrasenia) {
    
        return res.status(400).render('login',
        {
          msg: "Ingrese todos los datos solicitados",
          data: req.body
        });
  
      }

      const pool = await getConnection();
  
      const result = await pool
        .request()
        .input("identificacion", sql.Text, req.body.identificacion)
        .input("contrasenia", sql.Text, req.body.contrasenia)
        .execute("IniciarSesion");

      var user = result.recordset[0];

      console.log(user);   

      req.session.user = user;
      
      res.redirect(url.format({
        pathname:"/api/vacaciones/solicitar",
        query: {
          msg: "Se ha iniciado sesión correctamente"
        }          
      }));
      
    } catch (error) {
      res.status(500); 
      res.send(error.message);
    }
  };

