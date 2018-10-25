var express = require('express');
var router = express.Router();

var helpers = require('../lib/helpers');

// Define GET method for root part
router.get('/', function(req, res, next) {
  res.render('./public_info/index', { authorized: req.session.isActive });
});

// Define GET method for root part
router.get('/company_about', function(req, res, next) {
  res.render('./public_info/company_about', { authorized: req.session.isActive });
});

// Define GET method for root part
router.get('/company_news', function(req, res, next) {
  res.render('./public_info/company_news', { authorized: req.session.isActive });
});

// Define GET method for root part
router.get('/shipping_calculator', function(req, res, next) {
  res.render('./public_info/shipping_calculator', {
    authorized: req.session.isActive,
    price: false,
    from: '',
    to: '',
    weight: 0
  });
});

// Define GET method for root part
router.post('/shipping_calculator', function(req, res, next) {
  let cost = (Math.random() * 9000 + 1000).toFixed(2);
  res.render('./public_info/shipping_calculator', {
    authorized: req.session.isActive,
    price: cost,
    from: req.body.from,
    to: req.body.to,
    weight: req.body.weight
  });
});

// Define GET method for root part
router.get('/shipping_info', function(req, res, next) {
  res.render('./public_info/shipping_info', { authorized: req.session.isActive });
});

// Define GET method for root part
router.get('/shipping_prices', function(req, res, next) {
  res.render('./public_info/shipping_prices', { authorized: req.session.isActive });
});

// Define GET method for root part
router.get('/support_contact', function(req, res, next) {
  res.render('./public_info/support_contact', { authorized: req.session.isActive });
});

// Define GET method for root part
router.get('/support_feedback', function(req, res, next) {
  res.render('./public_info/support_feedback', { authorized: req.session.isActive });
});

// Define GET method for root part
router.get('/support_callback', function(req, res, next) {
  res.render('./public_info/support_callback', { authorized: req.session.isActive });
});

// Define GET method for root part
router.post('/support_callback', function(req, res, next) {
  req.app.db.model('CallbackRequest').create({
    name: req.body.name,
    phone: req.body.phone
  }).then(() => {
    res.redirect('/');
  });
});

router.get('/login', function(req, res, next) {
  res.render('./public_info/login', { authorized: req.session.isActive });
});

// TODO: Use JWT?
// TODO: Hash password
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
            res.redirect('/');
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

router.get('/logout', function(req, res, next) {
  // If token exists
  if (req.session.isActive) {
    req.app.db.model('Token').destroy({
      where: {
        token: req.cookies.token,
        email: req.cookies.user
      }
    })
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/');
    });
  } else {
    res.redirect('/');
  }
});

router.get('/signup', function(req, res, next) {
  res.render('./public_info/signup', {title: 'Sign up'});
});

// TODO: send information to the data cluster
// TODO: hash password
router.post('/signup', function(req, res, next) {
  // Create a user in DB
  req.app.db.model('User').create({...req.body.user}).then((resp) => {
    // Say user about successful creation
    res.render('./public_info/login',
    {message: 'Account created. You can log in now.'});
  }).catch((err) => {
    res.render('./public_info/signup',
    {message: 'User with such email already exists'});
  });
});

router.get('/tracking', function(req, res, next) {
  res.render('./public_info/tracking', { authorized: req.session.isActive });
});

router.get('/test_login', function(req, res, next) {
  // If token exists
  if (req.session.isActive) {
    res.send('User: ' + req.cookies.user + '<br>Token: ' + req.cookies.token);
  } else {
    res.send('You have not been authenticated.');
  }
});

module.exports = router;
