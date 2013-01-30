
var db = require("./db");

exports.get_handler = function(req, res, next) {
  if (!req.session.hunter) {
    throw "Session variables not set";
  }

  db.get_user_completed_clue(req.session.hunter, function(clue) {
    req.session.current_clue_num = clue;
    req.session.current_clue = req.session.hunt[clue];
    next();
  });
};

var euclidean = function(lat_0, lng_0, lat_1, lng_1) {
  var f = (lat_0 - lat_1);
  var f2 = (lng_0 - lng_1);
  return Math.sqrt(f * f + f2 * f2);
}

var validate_answer = function(cur_clue, lat, lng, ans) {
  if (cur_clue.type == 0) { // geo
    if (euclidean(cur_clue.lat, cur_clue.lng, lat, lng) < cur_clue.thresh) {
      return true;
    }
  } else { // q/a
    if (ans.toLowerCase().trim() == cur_clue.answer.toLowerCase().trim()) {
      return true;
    }
  }

  return false;
};

exports.post_handler = function(req, res) {

  if (!req.session.hunter ||
      req.session.current_clue_num == null ||
      !req.session.hunt) {
    throw "Session variables not set";
  }

  var cur_clue = req.session.current_clue;

  console.log("POST /clue", req.session.hunter, req.session.current_clue_num);

  if (!validate_answer(cur_clue, req.body.lat, req.body.lng, req.body.ans)) {
    if (cur_clue.type == 0) {
      res.send(404);
    } else {
      res.redirect('/clue?err=1');
    }
    return;
  }

  console.log("VALID");

  db.update_user_set_current_clue(
    req.session.hunter,
    req.session.current_clue_num + 1,
    function() {
      if (cur_clue.type == 0){
        res.send("OK");
      } else {
        res.redirect('/clue');
      }
    }
  );
};
