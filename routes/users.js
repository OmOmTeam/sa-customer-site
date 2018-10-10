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
      req.app.db.model('Person').findById(user.person_id).then((person) => {
        // If user has address
        if (person.address_id) {
          // Lookup for address and render page with all the data
          req.app.db.model('Address').findById(person.address_id).then((address) => {
            res.render('./user/create_order', {
              authorized: req.session.isActive,
              person,
              address
            });
          });
        } else {
          // If user does not have address, render page without it
          let address = {};
          res.render('./user/create_order', {
            authorized: req.session.isActive,
            person,
            address
          });
        }
      });
    });
});

// Post method for /user/create_order
router.post('/create_order', function(req, res, next) {
  console.log(req.body.delivery);
  // Lookup for the user
  req.app.db.model('User').findOne({where: {email: req.session.user}})
    .then((user) => {
      // Lookup for user's personal info
      req.app.db.model('Person').findById(user.person_id).then((person) => {
        // If user has address
        req.app.db.model('Address').create(req.body.sender.address).then((send_addr) => {
          if (!person.address_id) {
            person.update({address_id: send_addr.id});
          }
          req.app.db.model('Address').create(req.body.recipient.address).then((rec_addr) => {
            req.app.db.model('Person').create({...req.body.sender.name, phone: req.body.sender.phone}).then((sender) => {
              req.app.db.model('Person').create({...req.body.recipient.name, phone: req.body.recipient.phone}).then((recipient) => {

                req.app.db.model('Order').create({
                  sender_id: sender.id,
                  receiver_id: recipient.id,
                  sender_addr_id: send_addr.id,
                  receiver_addr_id: rec_addr.id,
                  pkg_height: req.body.parcel.height,
                  pkg_wigth: req.body.parcel.width,
                  pkg_length: req.body.parcel.length,
                  pkg_weight: req.body.parcel.weight,
                  express: req.body.delivery.type == 'express',
                  door_to_door: req.body.delivery.pickup == 'building'
                }).then(() => {
                  res.redirect('/user/create_order');
                });
              });
            });
          });
        });
      });
    });

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
