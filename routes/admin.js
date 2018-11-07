var express = require('express');
var router = express.Router();

/*
 * ATTENTION! Relative paths!
 * This router acts upon the '/admin' subpath
 * i.e. route '/edit_info' will be transformed into '/admin/edit_info'
 */

router.use(function(req, res, next) {
  if (!req.session.isActive) {
    res.redirect('/');
  }
  // Lookup for the user
  req.app.db.model('User').findOne({where: {email: req.session.user}})
    .then((user) => {
      if (!user.is_admin) {
        res.redirect('/');
      } else {
        next();
      }
    });
});

router.get('/', function(req, res, next) {
  res.render('./admin/index');
});

router.get('/site_info_edit', function(req, res, next) {
  res.render('./admin/site_info_edit');
});

router.get('/add_news', function(req, res, next) {
  res.render('./admin/news_add');
});

router.get('/manage_news', function(req, res, next) {
  res.render('./admin/news_manage');
});

router.get('/add_pickpoints', function(req, res, next) {
  res.render('./admin/pickpoints_add');
});

router.get('/manage_pickpoints', function(req, res, next) {
  res.render('./admin/pickpoints_manage');
});

module.exports = router;
