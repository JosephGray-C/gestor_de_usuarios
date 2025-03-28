import { getConnection, sql } from "../database/connection.js";
import url from 'url';

export const getRegistro = async (req, res) => {
    try {      

      res.render("registro", { data: {}, msg : "", status: 0});

    } catch (error) {
      console.log(res.status(500));
      console.log(res.send(error.message));

      res.redirect(url.format({
        pathname:"/registro",
        query: {
          msg: "Hubo un errror"
        }          
      }));
    }
};

export const postRegistro = async (req, res) => {
  try {      
    console.log(req.body);

    if (!req.body.nombre || !req.body.edad || !req.body.identificacion || !req.body.contrasenia) {
    
      return res.status(400).render('registro',
      {
        msg: "Ingrese todos los datos solicitados",
        data: req.body
      });

    }

    const pool = await getConnection();

    const result = await pool
      .request()
      .input("nombre", sql.Text, req.body.nombre)
      .input("edad", sql.Int, req.body.edad)
      .input("identificacion", sql.Text, req.body.identificacion)
      .input("contrasenia", sql.Text, req.body.contrasenia)
      .execute("InsertarUsuario");
      
    console.log(result.recordset);   

    var user = result.recordset[0];
      
    console.log(user);   

    req.session.user = user;

    res.redirect(url.format({
      pathname:"/api/usuarios",
      query: {
        msg: "Usuario creado correctamente"
      }          
    }));
  } catch (error) {
      console.log(error.message)
      return res.status(400).render('registro',
      {
        msg: 'Problema con el proceso de registro '
      });
  }
};