
/**
 * Declare Module dependencies
 */

var express = require('express'),
	path = require('path'),
	config = require('./config');

// Express App Server
var app = express();
config.readSettings();

// Settings for all environments
app.set('port', config.port);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('env', config.env);

/**
 * Set up Middleware
 */
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for Dev Env only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var supervisordapi = require('supervisord');

/**
 * Set routes
 */
var routes = require('./routes')({
	'app': app,
	'config': config,
	'supervisordapi': supervisordapi
});

/**
 * Start Express Server
 */
app.listen(app.get('port'), function(){
	console.log('Nodervisor launched on port ' + app.get('port'));
});
