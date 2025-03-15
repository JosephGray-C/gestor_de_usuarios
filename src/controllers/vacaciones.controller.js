import { log } from "console";
import { getConnection, sql } from "../database/connection.js";

export const getVacaciones = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .query("SELECT * FROM Vista_SolicitudesVacaciones");
    var resJSON = result.recordset;
    console.log(resJSON);
    // var resJSON = JSON.stringify(result.recordset);
    // console.log(resJSON);
    res.render("vacaciones", { vacaciones: resJSON });
  } catch (error) {
    res.status(500);
    res.send(error.message);
    res.render("index", error.message);
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
