export const sesionUsuario = async (req, res, usuario) => {
  try {

    req.session.user = usuario;

    console.log(req.session.user)

    return true;

  } catch (error) {
    return res.status(400).send(error.message);
  }  
  
};