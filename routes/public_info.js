var express = require('express');
var router = express.Router();

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

router.get('/signup', function(req, res, next) {
  res.render('./public_info/signup', {title: 'Sign up'});
});

router.post('/signup', function(req, res, next) {
  req.app.db.model('User').create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.pwd
  }).then(() => {
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

router.get('/signup', function(req, res, next) {
  res.render('./public_info/signup', {title: 'tracking'});
});

router.get('/login', function(req, res, next) {
  res.render('./public_info/login', {title: 'tracking'});
});

module.exports = router;
