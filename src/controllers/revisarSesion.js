import url from 'url';

export const revisarSesion = async (req, res) => {
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

      if (sessionData == undefined) {
          res.redirect(url.format({
            pathname:"/login",
            query: {
              msg: "Debes iniciar sesión"
            }          
          }));
      }
    })
  } catch (error) {
    res.status(400);
    res.send(error.message);
  }
}