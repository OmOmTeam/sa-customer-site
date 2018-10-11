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
  // Lookup for the user
  req.app.db.model('User').findOne({where: {email: req.session.user}})
    .then((user) => {
      // Lookup for user's personal info
      res.render('./user/create_order', {
        authorized: req.session.isActive,
        user
      });
    });
});

// Post method for /user/create_order
router.post('/create_order', function(req, res, next) {
  console.log(req.body.delivery);
  // Lookup for the user
  req.app.db.model('User').findOne({where: {email: req.session.user}})
    .then((user) => {
      if (!req.body.additional) req.body.additional = {};
      req.app.db.model('Order').create({
        ...req.body.order,
        owner_id: user.id,
        express: req.body.delivery.type == 'express',
        door_to_door: req.body.delivery.pickup == 'building',
        sms_notify: Object.keys(req.body.additional).includes('sms'),
        contents_list: Object.keys(req.body.additional).includes('contents'),
        letter: Object.keys(req.body.additional).includes('letter')
      }).then((resp) => {
        res.redirect('/user/manage_orders');
      });
    });

});

// Get method for /user/edit_account
router.get('/edit_account', function(req, res, next) {
  res.render('./user/edit_account', { authorized: req.session.isActive });
});

// Get method for /user/manage_orders
router.get('/manage_orders', function(req, res, next) {
  req.app.db.model('User').findOne({where: {email: req.session.user}})
    .then((user) => {
      req.app.db.model('Order').findAll({where: {owner_id: user.id}})
        .then((orders) => {
          res.render('./user/manage_orders', {
            authorized: req.session.isActive,
            orders 
          });
        });
    });
});

module.exports = router;
