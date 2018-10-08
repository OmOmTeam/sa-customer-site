var express = require('express');
var router = express.Router();

 /*
  * ATTENTION! Relative paths!
  * This router acts upon the '/user' subpath
  * i.e. route '/create_order' will be transformed into '/user/create_order'
  */

// Get method for /user/
router.get('/', function(req, res, next) {
  res.render('./user/index', { authorized: req.session.isActive });
});

// Get method for /user/create_order
router.get('/create_order', function(req, res, next) {
  res.render('./user/create_order', { authorized: req.session.isActive });
});

// Get method for /user/edit_account
router.get('/edit_account', function(req, res, next) {
  res.render('./user/edit_account', { authorized: req.session.isActive });
});

// Get method for /user/manage_orders
router.get('/manage_orders', function(req, res, next) {
  res.render('./user/manage_orders', { authorized: req.session.isActive });
});

module.exports = router;
