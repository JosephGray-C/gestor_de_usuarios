import { getConnection, sql } from "../database/connection.js";

export const getUsuarios = async (req, res) => {
  try {

    // console.log(req.session);
    // console.log(req.session.id);

    req.sessionStore.get(req.session.id, (err, sessionData) => {
      if(err){
        console.log(err);
        throw err;
      }
      console.log(" ");
      console.log("Session Object Stored: ");
      console.log(sessionData);
      console.log(" ");
    })

    const pool = await getConnection();

    const result = await pool.request().query("EXEC ObtenerUsuarios");

    var resJSON = result.recordset

    // console.log(resJSON)

    res.render("listarUsuarios", {usuarios: resJSON});

  } catch (error) {
    res.status(500);

    res.send(error.message);
    
    // res.render("users", error.message)
  }
};
  
export const deleteUsuarioById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.id)
      .query(" ");

    if (result.rowsAffected[0] === 0) return res.sendStatus(404);

    return res.sendStatus(204);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getTotalUsuarios = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query(" ");
  res.json(result.recordset[0][""]);
};

