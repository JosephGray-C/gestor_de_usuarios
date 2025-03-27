import { log } from "console";
import { getConnection, sql } from "../database/connection.js";
import session from 'express-session'

export const getLogin = async (req, res) => {
    try {
      console.log(" ");
      console.log("Session Object : ");
      console.log(req.session);
      console.log(" ");
      console.log("Session ID : ");
      console.log(req.session.id)
      console.log(" ");

      req.session.visited = true;
      
      res.render("login", { data: {} });
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };