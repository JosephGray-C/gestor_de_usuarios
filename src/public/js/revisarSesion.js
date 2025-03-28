import url from 'url';

export const revisarSesion = async (req, res) => {
  try {

    console.log(" ");
    console.log("(Revisión de sesión)Session ID: ");
    console.log(req.session.id);
    console.log(" ");

    req.sessionStore.get(req.session.id, (err, sessionData) => {

      if(err){
        console.log(err);
        throw err;
      }

      if (sessionData == undefined) {
          res.redirect(url.format({
            pathname:"/login",
            query: {
              msg: "Debes iniciar sesión"
            }          
          }));
      }

      console.log("Session Object Stored: ");
      console.log(sessionData);
      console.log(" ");

    })

  } catch (error) {
    res.status(400);
    res.send(error.message);
  }
}