
var hunts = require('../hunt.json');

exports.cache_controller = function(req, res, next) {
  res.header(
    'Cache-Control',
    'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0'
  );
  next();
}

exports.login_handler = function(req, res) {
  if (hunts[req.body.hname]) {
    req.session.hunter = req.body.hname;
    req.session.hunt = hunts[req.body.hname];
    res.redirect('/clue');
  } else {
    res.redirect('/login?err=1');
  }
};

exports.logout_handler = function(req, res) {
  if (req.session.hunter) {
    req.session.destroy();
  }
  res.redirect('/');
};

exports.verify = function(req, res, next) {
  if (!req.session.hunter) {
    res.redirect('/login');
  } else {
    next();
  }
}

