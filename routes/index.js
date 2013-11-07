/*
 * Set up all routes
 */

function routes(params) {
	var app = params.app;

	/*
	 * Shim to load all files in routes folder
	 */
	var fs = require('fs'),
		path = require('path');

	fs.readdirSync(__dirname).forEach(function(file) {
		var route_fname = __dirname + '/' + file;
		var route_name = path.basename(route_fname, '.js');
		if (route_name !== 'index' && route_name[0] !== ".") {
			routes[route_name] = require(route_fname)[route_name];
		}
	});

	/**
	 * Link routes to items in routes array
	 */
	
	// Home page
	app.get('/', routes['supervisord']());
	app.get('/ajax/supervisord', routes['ajax_supervisord'](params));

	// Hosts page
	app.get('/hosts', routes['hosts'](params));
	app.post('/hosts', routes['hosts'](params));

	// Users page
	app.get('/users', routes['users'](params));
	app.post('/users', routes['users'](params));

	// New User page
	/*
	app.get('/user/new', routes['users'](params));
	app.post('/user/new', routes['users'](params)); */
	// User edit page
	app.get('/user/:idUser', routes['users'](params));
	app.post('/user/:idUser', routes['users'](params));

	// Login page
	app.get('/login', routes['login'](params));
	app.post('/login', routes['login'](params));

	// Logout page
	app.get('/logout', routes['logout']());

	// Supervisor Control Page
	app.get('/ajax/supervisorctl', routes['ajax_supervisorctl'](params));
}

module.exports = routes;