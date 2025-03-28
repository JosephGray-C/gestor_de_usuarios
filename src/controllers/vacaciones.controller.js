import { getConnection, sql } from "../database/connection.js";
import { revisarSesion } from "../public/js/revisarSesion.js";
import url from "url";

export const getVacaciones = async (req, res) => {

  revisarSesion(req, res);

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
        data: {}
      }
    );

  } catch (error) {

    return res.status(500).send(error.message);

  }

};

export const getSolicitarVacacion = async (req, res) => {

  revisarSesion(req, res);

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

export const postCrearVacacion = async (req, res) => {

  await revisarSesion(req, res);

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

    // const pool = await getConnection();

    // const result = await pool
    //   .request()
    //   .input("id_usuario", sql.Int, req.body.id_usuario)
    //   .input("id_manager", sql.Int, req.body.id_manager)
    //   .input("id_rrhh", sql.Int, req.body.id_rrhh)
    //   .input("fecha_inicio", sql.Date, req.body.fecha_inicio)
    //   .input("fecha_fin", sql.Date, req.body.fecha_fin)
    //   .input("motivo", sql.Text, req.body.motivo)
    //   .execute("SolicitarVacaciones");

    // res.redirect(url.format({
    //   pathname:"/listarVacaciones",
    //   query: {
    //     msg: "Vacación creada correctamente"
    //   }
    // }));

  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const postAceptarVacacion = async (req, res) => {
  revisarSesion(req, res);

  try {
    console.log(req.params);

    if (!req.params.id || !req.params.usuario || !req.params.motivo) {
      


    }

    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id_vacacion", sql.Int, req.params.id)
      .input("id_usuario", sql.Int, req.params.usuario)
      .input("motivo", sql.Text, req.params.motivo)
      .execute("AceptarVacaciones");

    console.log(result.recordset);

    return res.redirect(
      url.format({
        pathname: "/vacaciones",
        query: {
          msg: "Vacación aceptada",
        },
      })
    );
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const postRechazarVacacion = async (req, res) => {
  revisarSesion(req, res);

  try {
    console.log(req.params);

    if (!req.params.id || !req.params.usuario || !req.params.motivo) {
      
      

    }

    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id_vacacion", sql.Int, req.params.id)
      .input("id_usuario", sql.Int, req.params.usuario)
      .input("motivo", sql.Text, req.params.motivo)
      .execute("RechazarVacaciones");

    console.log(result.recordset);

    return res.redirect(
      url.format({
        pathname: "/vacaciones",
        query: {
          msg: "Vacación rechazada",
        },
      })
    );
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
