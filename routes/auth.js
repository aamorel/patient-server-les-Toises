var express = require('express');
var passport = require('passport');

var router = express.Router();

router.post(
  '/login/password',
  passport.authenticate('local'),
  function (req, res) {
    res.send('authentified');
  }
);

router.get('/logout', function (req, res, next) {
  req.logout();
  res.send('logged out');
});

module.exports = router;
