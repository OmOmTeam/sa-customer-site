/*
 * Session processing lib by Andrey @Voisvet Pavlenko
 */

session = {};

// Function that checks given token
session.isValid = (token, user, db, callback) => {
  // Lookup for the token in the database
  db.model('Token').findOne({where: {token: token}})

  .then(tokenObj => {
    // If token found
    if (tokenObj) {
      // Check validity of token
      if (user == tokenObj.email &&
        Date.parse(tokenObj.expires) > Date.now()) {
          console.log('User: ' + user + '<br>Token: ' + token);
          callback(true);
        } else {
          console.log('Token has already expired');
          callback(false);
        }
      } else {
        console.log('There is no such token');
        callback(false);
      }
    })

    .catch(err => {
      console.log(err);
      callback(false);
    });
  };

// Middleware that takes cookies and vaidates the token
session.middleware = (req, res, next) => {
  req.session = {};
  if (req.cookies.user && req.cookies.token) {
    session.isValid(req.cookies.token, req.cookies.user, req.app.db, (result) => {
      if (result) {
        req.session.user = req.cookies.user;
        req.session.isActive = true;
        next();
      } else {
        req.session.isActive = false;
        next();
      }
    });
  } else {
    req.session.isActive = false;
    next();
  }
};

module.exports = session;
