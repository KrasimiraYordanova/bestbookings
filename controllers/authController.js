// const validator = require('validator');
const { body, validationResult } = require("express-validator");
const authController = require("express").Router();

const { login, register } = require("../services/authService");

authController.get("/login", (req, res) => {
  res.render("login", {
    title: "Login",
  });
});

authController.post("/login", async (req, res) => {
  try {
    const result = await login(req.body.username, req.body.pass);
    attachToken(req, res, result);
    res.redirect("/");
  } catch (err) {
    res.render("login", {
      title: "Login",
      error: err.message.split("\n"),
    });
  }
});

authController.get("/register", (req, res) => {
  res.render("register", { title: "Register" });
});

authController.post(
  "/register",
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required").bail()
    .isAlphanumeric()
    .withMessage("Usename may contains only latin letters"),
  body("pass")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("repass")
    .trim()
    .custom(async (value, { req }) => {
      if (value != req.body.pass) {
        throw new Error("Passwords don't match!");
      }
    }),
  async (req, res) => {
    try {
      const { errors } = validationResult(req);
      console.log(errors);
      if (errors.length > 0) {
        throw errors;
      }

      // if(validator.default.isEmpty(req.body.username.trim()) || validator.default.isEmpty(req.body.pass.trim())) {
      //   throw new Error('All fields are required!');
      // }
      // if(validator.default.isEmpty(req.body.pass.trim()) != validator.default.isEmpty(req.body.repass.trim())) {
      //   throw new Error('Passwords don\'t match!');
      // }

      // if(req.body.username.trim() == '' || req.body.pass.trim() == '') {
      //   throw new Error('All fields are required!');
      // }
      // if(req.body.pass.trim() != req.body.repass.trim()) {
      //   throw new Error('Passwords don\'t match!');
      // }

      const result = await register(
        req.body.username,
        req.body.pass
      );
      attachToken(req, res, result);
      res.redirect("/");
    } catch (error) {
      const fields = Object.fromEntries(error.map(e => [e.path, e.path]));
      console.log(fields);
      res.render("register", {
        title: "Register",
        // body: {
          username: req.body.username,
        // }
        error,
        fields
      });
    }
  }
);

authController.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.redirect("/");
});

function attachToken(req, res, data) {
  // GENERATING THE TOKEN
  const token = req.signJwt(data);
  // SETTING THE COOKIE
  res.cookie("token", token, { maxAge: 14400000 });
}

module.exports = authController;
