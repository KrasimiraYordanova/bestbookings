const jwt = require("jsonwebtoken");

function verifyAuth(jwtSecret) {
  return function toReturn(req, res, next) {
    const token = req.cookies.token;
    if (token) {
      try {
        const data = jwt.verify(token, jwtSecret);
        req.user = data;
      } catch (err) {
        res.cookie("token", "", { maxAge: 0 });
        return res.redirect("/login");
      }
    }
    req.signJwt = (data) => jwt.sign(data, jwtSecret, {
        expiresIn: '4h'
    });

    next();
  };
}

module.exports = verifyAuth;
