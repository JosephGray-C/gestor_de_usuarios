import { getConnection, sql } from "../database/connection.js";
import { revisarSesion } from "../public/js/revisarSesion.js";
import url from 'url';

export const listarVacaciones = async (req, res) => {

  revisarSesion(req, res);

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .query("SELECT * FROM Vista_SolicitudesVacaciones");
    var resJSON = result.recordset;
    console.log(resJSON);

    const mensaje = req.query.msg;

    res.render("listarVacaciones", 
      { 
        vacaciones: resJSON,
        msg : mensaje
      }
    );

  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const createVacaciones = async (req, res) => {

  await revisarSesion(req, res);

  try {
    if (!req.body.fecha_inicio || !req.body.fecha_fin || !req.body.id_manager || !req.body.id_rrhh || !req.body.motivo) {
      
      

    }
   
    const pool = await getConnection();
  
    const result = await pool
      .request()
      .input("id_usuario", sql.Int, req.body.id_usuario) 
      .input("id_manager", sql.Int, req.body.id_manager)
      .input("id_rrhh", sql.Int, req.body.id_rrhh)
      .input("fecha_inicio", sql.Date, req.body.fecha_inicio)
      .input("fecha_fin", sql.Date, req.body.fecha_fin)
      .input("motivo", sql.Text, req.body.motivo)
      .execute("SolicitarVacaciones");
      
    // res.redirect(url.format({
    //   pathname:"/misVacaciones",
    //   query: {
    //     msg: "Vacación creada correctamente"
    //   }          
    // }));   

  } catch (error) {
    res.status(500);
    res.send(error.message);
  }

};

export const solicitarVacacion = async (req, res) => {

  revisarSesion(req, res);

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .query("SELECT * FROM Vista_Managers_Recursos_Humanos");

    var usuarios = result.recordset;
    console.log(usuarios);

    res.render("solicitarVacaciones", { msg : {}, data: {}, usuarios : usuarios });

  } catch (error) {
    res.status(400);
    res.send(error.message);
  }

};


export const aceptarVacacion = async (req, res) => {

  revisarSesion(req, res);

  try {
    console.log(req.params);
  
    if (!req.params.id || !req.params.usuario || !req.params.motivo) {
      return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
    }

    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id_vacacion", sql.Int, req.params.id)
      .input("id_usuario", sql.Int, req.params.usuario)
      .input("motivo", sql.Text, req.params.motivo)
      .execute("AceptarVacaciones");
      
    console.log(result.recordset);

    res.redirect(url.format({
      pathname:"/listarVacaciones",
      query: {
        msg: "Vacación aceptada"
      }          
    }));

  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const rechazarVacacion = async (req, res) => {

  revisarSesion(req, res);

  try {
    console.log(req.params);

    if (!req.params.id || !req.params.usuario || !req.params.motivo) {
      return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
    }  

    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id_vacacion", sql.Int, req.params.id)
      .input("id_usuario", sql.Int, req.params.usuario)
      .input("motivo", sql.Text, req.params.motivo)
      .execute("RechazarVacaciones");

    console.log(result.recordset);

    res.redirect(url.format({
      pathname:"/listarVacaciones",
      query: {
        msg: "Vacación rechazada"
      }          
    }));

  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
