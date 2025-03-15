import { getConnection, sql } from "../database/connection.js";

export const getUsers = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("EXEC ObtenerUsuarios");
    var resJSON = result.recordset
    console.log(resJSON)
    // var resJSON = JSON.stringify(result.recordset); 
    // console.log(resJSON);
    res.render("users", {users: resJSON});
  } catch (error) {
    res.status(500);
    res.send(error.message);
    res.render("users", error.message)
  }
};

export const createNewUser = async (req, res) => {
  const { name, description, quantity = 0, price } = req.body;

  if (description == null || name == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("name", sql.VarChar, name)
      .input("description", sql.Text, description)
      .input("quantity", sql.Int, quantity)
      .input("price", sql.Decimal, price)
      .query(
        " "
      );

    res.json({
      name,
      description,
      quantity,
      price,
      id: result.recordset[0].id,
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getUserById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.id)
      .query(" ");

    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const deleteUserById = async (req, res) => {
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

export const getTotalUsers = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query(" ");
  res.json(result.recordset[0][""]);
};

export const updateUserById = async (req, res) => {
  const { description, name, quantity = 0, price } = req.body;

  if (
    description == null ||
    name == null ||
    quantity == null ||
    price == null
  ) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input(" ", req.params.id)
      .input(" ", sql.VarChar, name)
      .input(" ", sql.Text, description)
      .input(" ", sql.Int, quantity)
      .input(" ", sql.Decimal, price)
      .query(
        " "
      );

    if (result.rowsAffected[0] === 0) return res.sendStatus(404);

    res.json({ name, description, quantity, price, id: req.params.id });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
