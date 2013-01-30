
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , db = require('./lib/db')
  , session_utils = require('./lib/session_utils')
  , hunt_utils = require('./lib/hunt_utils')
  , app_secret = require('./secret').secret;

var app = express();
var MemStore = express.session.MemoryStore;

db.init(function(err) {
  if (err) {
    throw err;
  }
});

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session({ secret: app_secret, store: new MemStore( {
      reapInterval: 60000 * 60
    })
  }));
  app.use(session_utils.cache_controller);
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
  app.locals.pretty = true;
});

app.get('/', routes.index); // redirects to clue
app.get('/login', routes.login);
app.get('/help', routes.help);
app.get('/logout', session_utils.logout_handler);
app.get('/reset', session_utils.verify, hunt_utils.reset_handler);
app.get('/clue', session_utils.verify, hunt_utils.get_handler, routes.clue);

app.post('/login', session_utils.login_handler);
app.post('/clue', session_utils.verify, hunt_utils.post_handler);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
