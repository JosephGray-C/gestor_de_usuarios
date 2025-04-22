import url from "url";

export const verificarSesion = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect(
        url.format({
          pathname: "/login",
          query: {
            msg: "Debes iniciar sesión"
          },
        })
    );
  }
  next();
};