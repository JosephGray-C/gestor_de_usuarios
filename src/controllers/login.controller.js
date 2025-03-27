import { log } from "console";
import { getConnection, sql } from "../database/connection.js";
import session from 'express-session'

export const getLogin = async (req, res) => {
    try {

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

      console.log(" ");
      console.log("Session Object : ");
      console.log(req.session);
      console.log(" ");
      console.log("Session ID : ");
      console.log(req.session.id)
      console.log(" ");

      req.session.visited = true;

      const mensaje = req.query.msg;
      
      res.render("login", { msg: mensaje });
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };