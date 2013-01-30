
var sqlite3 = require('sqlite3').verbose();

exports.init = function(cb) {
  exports.db = new sqlite3.Database('datastore.sqlite', cb);
  exports.db.run(
    "CREATE TABLE IF NOT EXISTS completed (" +
    "user VARCHAR(30) NOT NULL PRIMARY KEY, clue INTEGER NOT NULL)",
    cb
  );
}

exports.get_user_completed_clue = function(user, cb) {
  exports.db.get(
    "SELECT clue FROM completed WHERE user = ?",
    [user],
    function(err, row) {
      if (err) {
        throw err;
      } else if (row == undefined) { // empty row set
        cb(0);
      } else {
        cb(row['clue']);
      }
    }
  );
};

exports.update_user_set_current_clue = function(user, clue, cb) {
  exports.db.run(
    "REPLACE INTO completed (user, clue) VALUES (?, ?)",
    [user, clue],
    function(err) {
      if (err) {
        throw err;
      }
      cb();
    }
  );
};

exports.reset_user = function(user, cb) {
  exports.db.run(
    "DELETE FROM completed WHERE user = ?",
    [user],
    function(err) {
      if (err) {
        throw err;
      }
      cb();
    }
  );
};
