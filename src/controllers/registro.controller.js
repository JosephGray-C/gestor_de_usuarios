import { log } from "console";
import { getConnection, sql } from "../database/connection.js";

export const getRegistro = async (req, res) => {
    try {      

      res.render("registro", { data: {}, msg : "", status: 0, data: {}});

    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
};

export const postRegistro = async (req, res) => {
  try {      
    console.log(req.body);

    if (!req.body.nombre || !req.body.edad || !req.body.identificacion || !req.body.contrasenia) {
    
      return res.status(400).render('registro',
      {
        msg: "Ingrese todos los datos solicitados",
        status: 400,
        data : req.body
      });

    }
    try {
      const pool = await getConnection();
  
      const result = await pool
        .request()
        .input("nombre", sql.Text, req.body.nombre)
        .input("edad", sql.Int, req.body.edad)
        .input("identificacion", sql.Text, req.body.identificacion)
        .input("contrasenia", sql.Text, req.body.contrasenia)
        .execute("InsertarUsuario");
        
      console.log(result.recordset);

      res.redirect('/api/users');

    } catch (error) {
        console.log(error.message)
        return res.status(500).render('registro',
        {
          msg: 'Problema con el proceso de registro',
          status: 500,
          data : req.body
        });
    }
  } catch (error) {
      console.log(error.message)
      return res.status(400).render('registro',
      {
        msg: 'Problema con el proceso de registro ',
        status: 400,
        data : req.body
      });
  }
};