import { log } from "console";
import { getConnection, sql } from "../database/connection.js";

export const listarVacaciones = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .query("SELECT * FROM Vista_SolicitudesVacaciones");
    var resJSON = result.recordset;
    console.log(resJSON);

    res.render("listarVacaciones", { vacaciones: resJSON });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const createVacaciones = async (req, res) => {

  if (!req.body.nombre || !req.body.edad || !req.body.identificacion || !req.body.contrasenia) {
    
    return res.status(400).render('solicitarVacaciones',
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
      .input("id_usuario", sql.Int, req.body.id_usuario)
      .input("id_manager", sql.Int, req.body.id_manager)
      .input("id_rrhh", sql.Int, req.body.id_rrhh)
      .input("fecha_inicio", sql.Date, req.body.fecha_inicio)
      .input("fecha_fin", sql.Date, req.body.fecha_fin)
      .input("motivo", sql.Text, req.body.motivo)
      .execute("SolicitarVacaciones");
      
    console.log(result.recordset);

  } catch (error) {
    res.status(500);
    res.send(error.message);
  }

};

export const solicitarVacacion = async (req, res) => {
  try {


    
    res.render("solicitarVacaciones", { data: {} });

  } catch (error) {
    res.status(400);
    res.send(error.message);
  }
};


export const aceptarVacacion = async (req, res) => {
  console.log(req.params);
  
  if (!req.params.id || !req.params.usuario || !req.params.motivo) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id_vacacion", sql.Int, req.params.id)
      .input("id_usuario", sql.Int, req.params.usuario)
      .input("motivo", sql.Text, req.params.motivo)
      .execute("AceptarVacaciones");
      
    console.log(result.recordset);

    return res.status(200).json({ message: "Vacación aceptada", data: result.recordset });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const rechazarVacacion = async (req, res) => {
  console.log(req.params);

  if (!req.params.id || !req.params.usuario || !req.params.motivo) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id_vacacion", sql.Int, req.params.id)
      .input("id_usuario", sql.Int, req.params.usuario)
      .input("motivo", sql.Text, req.params.motivo)
      .execute("RechazarVacaciones");

    console.log(result.recordset);

    return res.status(200).json({ message: "Vacación aceptada", data: result.recordset });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
