import url from "url";

export const revisarSesion = async (req, res) => {
  try {
    const sessionData = await new Promise((resolve, reject) => {
      req.sessionStore.get(req.session.id, (err, sessionData) => {
        if (err) return reject(err);
        resolve(sessionData);
      });
    });

    if (!sessionData || !sessionData.user) {
      res.redirect(
        url.format({
          pathname: "/login",
          query: {
            msg: "Debes iniciar sesión",
            data: {},
          },
        })
      );
      return false;
    }

    return true;

  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
    return false;
  }
};

