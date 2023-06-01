const authController = require("express").Router();

const { login } = require('../services/authService');


authController.get("/login", (req, res) => {
  res.render('login', {
    title: 'Login'
  })
});

authController.post('/login', async(req, res) => {
    const result = await login(req.body.username, req.body.pass);
    const token = req.signJwt(result);
    res.cookie('token', token);
    res.redirect('/');
})

module.exports = authController;
