var express = require('express');
var router = express.Router();

var helpers = require('../lib/helpers');

// Define GET method for root part
router.get('/', function(req, res, next) {
  res.render('./public_info/index');
});

// Define GET method for root part
router.get('/company_about', function(req, res, next) {
  res.render('./public_info/company_about', { title: 'About Company' });
});

// Define GET method for root part
router.get('/company_news', function(req, res, next) {
  res.render('./public_info/company_news', { title: 'Our News' });
});

// Define GET method for root part
router.get('/shipping_calculator', function(req, res, next) {
  res.render('./public_info/shipping_calculator', { title: 'Shipment Cost Calculator' });
});

// Define GET method for root part
router.get('/shipping_info', function(req, res, next) {
  res.render('./public_info/shipping_info', { title: 'Shipping Info' });
});

// Define GET method for root part
router.get('/shipping_prices', function(req, res, next) {
  res.render('./public_info/shipping_prices', { title: 'Pricings' });
});

// Define GET method for root part
router.get('/support_contact', function(req, res, next) {
  res.render('./public_info/support_contact', { title: 'Support Contacts' });
});

// Define GET method for root part
router.get('/support_feedback', function(req, res, next) {
  res.render('./public_info/support_feedback', { title: 'Feedback' });
});

// Define GET method for root part
router.get('/support_callback', function(req, res, next) {
  res.render('./public_info/support_callback', { title: 'Callback' });
});

router.get('/login', function(req, res, next) {
  res.render('./public_info/login', {title: 'Login'});
});

// TODO: Use JWT?
router.post('/login', function(req, res, next) {
  // Lookup for a user in DB
  req.app.db.model('User').findOne({where: {email: req.body.email}})
    .then(user => {
      // If user exists
      if (user) {
        // Check the password
        if (user.password === req.body.pwd) {
          // Create token and calculate expiration date
          let token = helpers.createRandomString(20);
          let expirationDate = new Date(Date.now() + 86400000);

          // Insert token in DB
          req.app.db.model('Token').create({
            token: token,
            email: user.email,
            expires: expirationDate
          }).then(() => {
            // Give cookie with token to user
            res.cookie('user', user.email, {expires: expirationDate});
            res.cookie('token', token, {expires: expirationDate});
            res.render('./public_info/login',
              {message: 'Success!'});
          }).catch((err) => {
            console.log(err);
            res.render('./public_info/login',
              {message: 'Something went wrong... Try later.'});
          });
        } else {
          res.render('./public_info/login',
            {message: 'Wrong email or password'});
        }
      } else {
        res.render('./public_info/login',
          {message: 'User with specified e-mail does not exist'});
      }
    })
});

router.get('/signup', function(req, res, next) {
  res.render('./public_info/signup', {title: 'Sign up'});
});

// TODO: send information to the data cluster
router.post('/signup', function(req, res, next) {
  // Create a user in DB
  req.app.db.model('User').create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.pwd
  }).then(() => {
    // Say user about successful creation
    res.render('./public_info/login',
      {message: 'Account created. You can log in now.'});
  }).catch((err) => {
    res.render('./public_info/signup',
      {message: 'User with such email already exists'});
  });
});

router.get('/tracking', function(req, res, next) {
  res.render('./public_info/tracking', {title: 'tracking'});
});

router.get('/test_login', function(req, res, next) {
  if (req.cookies.user && req.cookies.token) {
    req.app.db.model('Token').findOne({where: {token: req.cookies.token}})
      .then(token => {
        if (token) {
          if (Date.parse(token.expires) > Date.now()) {
            res.send('User: ' + req.cookies.user + '<br>Token: ' + req.cookies.token);
          } else {
            res.send('Token has already expired');
          }
        } else {
          res.send('There is no such token');
        }
      })
      .catch(err => {
        res.send(err);
      })
  } else {
    res.send('You have not been authenticated.')
  }
})

module.exports = router;
