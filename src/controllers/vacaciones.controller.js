import { getConnection, sql } from "../database/connection.js";
import { revisarSesion } from "../public/js/revisarSesion.js";
import url from "url";
import { parseLocalDate } from "../public/js/date.js";

export const getVacaciones = async (req, res) => {

  const sesionValida = await revisarSesion(req, res); 
  if (!sesionValida) return;

  try {

    const pool = await getConnection();

    const result = await pool
      .request()
      .query("SELECT * FROM Vista_SolicitudesVacaciones");

    var vacaciones = result.recordset;

    const mensaje = req.query.msg;

    return res.render("listarVacaciones", 
      {
        msg: mensaje,
        vacaciones: vacaciones,
        parseLocalDate,
        data: {}
      }
    );

  } catch (error) {

    return res.status(500).send(error.message);

  }

};

export const getMisVacaciones = async (req, res) => {

  const sesionValida = await revisarSesion(req, res); 
  if (!sesionValida) return;

  try {

    const pool = await getConnection();

    const result = await pool
      .request()
      .query("SELECT * FROM Vista_SolicitudesVacaciones");

    var vacaciones = result.recordset;

    console.log(vacaciones);

    console.log(req.session.user.id_usuario)

    const mensaje = req.query.msg;

    return res.render("misVacaciones", 
      {
        msg: mensaje,
        vacaciones: vacaciones,
        usuario : req.session.user,
        parseLocalDate,
        data: {}
      }
    );

  } catch (error) {

    return res.status(500).send(error.message);

  }

};

export const getSolicitarVacacion = async (req, res) => {

  const sesionValida = await revisarSesion(req, res);
  if (!sesionValida) return;

  try {

    const pool = await getConnection();

    const result = await pool
      .request()
      .query("SELECT * FROM Vista_Managers_Recursos_Humanos");

    var usuarios = result.recordset || req.query.msg;

    const mensaje = req.query.msg;

    return res.render("solicitarVacaciones", {
      msg: mensaje,
      usuarios: usuarios,
      data: {}
    });

  } catch (error) {

    return res.status(500).send(error.message);

  }
};


export const getGestorVacaciones = async (req, res) => {

  const sesionValida = await revisarSesion(req, res); 
  if (!sesionValida) return;

  try {

    const pool = await getConnection();

    const result = await pool
      .request()
      .query("SELECT * FROM Vista_SolicitudesVacaciones");

    var vacaciones = result.recordset;

    if (vacaciones) {
      console.log("Si VACACIONES")
    }
    // console.log(vacaciones);

    const mensaje = req.query.msg;

    return res.render("gestorVacaciones", 
      {
        msg: mensaje,
        vacaciones: vacaciones,
        usuario : req.session.user,
        parseLocalDate,
        data: {}
      }
    );

  } catch (error) { 

    return res.status(500).send(error.message);

  }

};

export const postSolicitarVacacion = async (req, res) => {
  const sesionValida = await revisarSesion(req, res);

  if (!sesionValida) return;

  try {
    if (!req.body.fecha_inicio || !req.body.fecha_fin || !req.body.id_manager || !req.body.id_rrhh || !req.body.motivo) {
  
      return res.redirect(
        url.format({
          pathname: "/api/vacaciones/solicitar",
          query: {
            msg: "Por favor, ingrese todos los datos solicitados.",
          },
        })
      );
    }

    console.log("Con todos los datos");
    console.log(req.body);

    console.log(req.session.user.id_usuario); 
  
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id_usuario", sql.Int, req.session.user.id_usuario)
      .input("id_manager", sql.Int, req.body.id_manager)
      .input("id_rrhh", sql.Int, req.body.id_rrhh)
      .input("fecha_inicio", sql.Date, req.body.fecha_inicio)
      .input("fecha_fin", sql.Date, req.body.fecha_fin)
      .input("motivo", sql.Text, req.body.motivo)
      .execute("SolicitarVacaciones");
  
    res.redirect(url.format({
      pathname:"/api/vacaciones/misVacaciones",
      query: {
        msg: "Vacación creada correctamente"
      }
    }));

  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const postAceptarVacacion = async (req, res) => {

  const sesionValida = await revisarSesion(req, res);
  if (!sesionValida) return;

  try {
    console.log(req.body);

    if (!req.body.id_vacacion || !req.body.id_usuario || !req.body.motivo) {
      return res.redirect(
        url.format({
          pathname: "gestor",
          query: {
            msg: "Por favor, ingrese todos los datos solicitados.",
          },
        })
      );
    }
    
    const pool = await getConnection();
    
    const result = await pool
    .request()
    .input("id_vacacion", sql.Int, req.body.id_vacacion)
    .input("id_usuario", sql.Int, req.body.id_usuario)
    .input("motivo", sql.Text, req.body.motivo)
    .execute("AceptarVacaciones");
    
    console.log(result.recordset);
    
    return res.redirect(
      url.format({
        pathname: "/api/vacaciones",
        query: {
          msg: "Vacación aceptada correctamente",
        },  
      })
    );
  } catch (error) {
    return res.status(500).send(error.message);
  } 
};

export const postRechazarVacacion = async (req, res) => {
  
  const sesionValida = await revisarSesion(req, res);
  if (!sesionValida) return; 
  
  try {
    console.log(req.body);
    

    if (!req.body.id_vacacion || !req.body.id_usuario || !req.body.motivo) {
      return res.redirect(
        url.format({
          pathname: "gestor",
          query: {
            msg: "Por favor, ingrese todos los datos solicitados.",
          },
        })
      );
    }
    
    const pool = await getConnection();
    
    const result = await pool
      .request()
      .input("id_vacacion", sql.Int, req.body.id_vacacion)
      .input("id_usuario", sql.Int, req.body.id_usuario)
      .input("motivo", sql.Text, req.body.motivo)
      .execute("RechazarVacaciones");

    console.log(result.recordset);

    return res.redirect(
      url.format({
        pathname: "/api/vacaciones",
        query: {
          msg: "Vacación rechazada correctamente",
        },
      })
    );
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
