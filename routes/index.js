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
	
	// Downloads page
	app.get('/', routes['supervisord']());
	app.get('/ajax/supervisord', routes['ajax_supervisord'](params));

	// Setup page
	app.get('/settings', routes['settings'](params));
	app.post('/settings', routes['settings'](params));

	// Download Control Page
	app.get('/ajax/supervisorctl', routes['ajax_supervisorctl'](params));
}

module.exports = routes;