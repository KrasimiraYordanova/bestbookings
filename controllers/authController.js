const authController = require("express").Router();

const { login, register } = require('../services/authService');


authController.get("/login", (req, res) => {
  res.render('login', {
    title: 'Login'
  })
});

authController.post('/login', async(req, res) => {
  try{
    const result = await login(req.body.username, req.body.pass);
    attachToken(req, res, result);
    res.redirect('/');
  }catch (err) {
    res.render('login', {
      title: 'Login',
      error: err.message.split('\n'),
    });
  } 
})

authController.get('/register', (req, res) => {
    res.render('register', { title: 'Register' })
})

authController.post('/register', async(req, res) => {
  try{
    if(req.body.username.trim() == '' || req.body.pass.trim() == '') {
      throw new Error('All fields are required!');
    }
    if(req.body.pass.trim() != req.body.repass.trim()) {
      throw new Error('Passwords don\'t match!');
    }
    const result = await register(req.body.username.trim(), req.body.pass.trim());
    console.log(result);
    attachToken(req, res, result);
    res.redirect('/');
  }catch (err) {
    res.render('register', {
      title: 'Register',
      error: err.message.split('\n'),
    });
  }
});

authController.get('/logout', (req, res) => {
  res.clearCookie('token');
  return res.redirect('/');
})

function attachToken(req, res, data) {
  // GENERATING THE TOKEN
  const token = req.signJwt(data);
  // SETTING THE COOKIE
  res.cookie('token', token, {maxAge: 14400000})
}

module.exports = authController;
