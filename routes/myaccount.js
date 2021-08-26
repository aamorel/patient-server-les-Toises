var express = require('express');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
var db = require('../db');

var router = express.Router();

/* GET users listing. */
router.get('/',
  
  ensureLoggedIn(),
  function(req, res, next) {
    db.get('SELECT rowid AS id, username, name FROM users WHERE rowid = ?', [ req.user.id ], function(err, row) {
      if (err) { return next(err); }
    
      // TODO: Handle undefined row.
      var user = {
        id: row.id.toString(),
        username: row.username,
        displayName: row.name
      };
      res.json(user);
    });
    
  });

router.get('/rdv-info/',

ensureLoggedIn(),
function(req, res, next) {
  db.get('SELECT rowid AS id, rdv_info as rdv_info FROM users WHERE rowid = ?', [ req.user.id ], function(err, row) {
    if (err) { return next(err); }
  
    // TODO: Handle undefined row.
    var rdv_info = {
      id: row.id.toString(),
      rdv_info: JSON.parse(row.rdv_info),
    };
    res.json(rdv_info);
  });
  
});

router.post('/rdv-info/',

ensureLoggedIn(),
function(req, res, next) {
  db.serialize(function() {
    db.run('UPDATE users SET rdv_info = ? WHERE rowid = ?', [
      JSON.stringify(req.body.rdv_info),
      req.user.id,
    ], function(err) {
      if (err) {
        console.log('error during insertion of new rdv');
        return next(err); 
      }
      
      res.send('rdv added');
    });
  });

  
});

router.get('/medication/',

ensureLoggedIn(),
function(req, res, next) {
  db.get('SELECT rowid AS id, medication as medication FROM users WHERE rowid = ?', [ req.user.id ], function(err, row) {
    if (err) { return next(err); }
  
    // TODO: Handle undefined row.
    var medication = {
      id: row.id.toString(),
      medication: JSON.parse(row.medication),
    };
    res.json(medication);
  });
  
});

router.post('/medication/',

ensureLoggedIn(),
function(req, res, next) {
  db.serialize(function() {
    db.run('UPDATE users SET medication = ? WHERE rowid = ?', [
      JSON.stringify(req.body.medication),
      req.user.id,
    ], function(err) {
      if (err) {
        console.log('error during insertion of new medication');
        return next(err); 
      }
      
      res.send('medication added');
    });
  });

  
});

module.exports = router;