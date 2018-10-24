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

router.post('/create_order', function(req, res, next) {
  let cost = (Math.random() * 9000 + 1000).toFixed(2);
  res.render('./user/confirm_order', {
    authorized: req.session.isActive,
    order: req.body.order,
    delivery: req.body.delivery,
    additional: req.body.additional,
    cost: cost
  });
});

router.post('/create_order_back', function(req, res, next) {
  res.render('./user/create_order_back', {
    authorized: req.session.isActive,
    order: req.body.order,
    delivery: req.body.delivery,
    additional: req.body.additional
  });
});

// Post method for /user/create_order
router.post('/confirm_order', function(req, res, next) {
  // Lookup for the user
  req.app.db.model('User').findOne({where: {email: req.session.user}})
    .then((user) => {
      if (!req.body.additional) req.body.additional = {};
      if (!user.country) {
        user.update({
          country: req.body.order.sender_country,
          region: req.body.order.sender_region,
          city: req.body.order.sender_city,
          street: req.body.order.sender_street,
          building_number: req.body.order.sender_building_number,
          additional_info: req.body.order.sender_additional_info
        });
      }
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

// Get method for /user/payment
router.get('/payment/:orderId', function(req, res, next) {
  let cost = (Math.random() * 9000 + 1000).toFixed(2);
  res.render('./user/payment', {
     authorized: req.session.isActive,
     order_id: req.params.orderId,
     cost
   });
});

// Get method for /user/payment_success
router.get('/payment/:orderId/success', function(req, res, next) {
  res.render('./user/payment_success', {
     authorized: req.session.isActive
   });
});

module.exports = router;
