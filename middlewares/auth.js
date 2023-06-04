const jwt = require("jsonwebtoken");

function verifyAuth(jwtSecret) {
  return function toReturn(req, res, next) {
    const token = req.cookies.token;
    if (token) {
      try {
        const data = jwt.verify(token, jwtSecret);
        req.user = data;
      } catch (err) {
        // CLEARING THE COOKIE IF IT IS NOT VALID (x2 ways)
        // res.cookie("token", "", { maxAge: 0 });
        res.clearCookie("token");
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
