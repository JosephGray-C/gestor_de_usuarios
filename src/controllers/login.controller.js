import { log } from "console";
import { getConnection, sql } from "../database/connection.js";

export const getLogin = async (req, res) => {
    try {
    
      // res.redirect("api/users");
      
      res.render("login", { data: {} });
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };