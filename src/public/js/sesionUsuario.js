export const sesionUsuario = async (req, res, usuario) => {
  try {

    console.log(" ");
    console.log("(Revisión de sesión)Session ID: ");
    console.log(req.session.id);
    console.log(" ");

    req.session.user = usuario;

    console.log(" ");
    console.log("Session : ");
    console.log(req.session);
    console.log(" ");
    
    return true;

  } catch (error) {
    return res.status(400).send(error.message);
  }  
  
};