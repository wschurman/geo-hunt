
var _ = require('underscore')
  , expose = require('express-expose');

exports.index = function(req, res) {
  res.redirect('/clue');
};

exports.help = function(req, res) {
  res.render('help');
}

exports.login = function(req, res) {
  res.render('login', {
    err: req.query['err']
  });
};

exports.clue = function(req, res) {
  var data = _.omit(req.session.current_clue, 'answer');

  res.expose(data, 'hunt.clue');
  res.render('clue', {
    clue: data,
    err: req.query['err']
  });
};
