/*
 * GET/POST settings page
 */

exports.settings = function(params) {
	var config = params.config;
	return function(req, res) {
		var fs = require('fs');
		var saved = false;
		var settings = params.config.settings;
		
		if (req.body.submit !== undefined) {
			console.log(req.body);
			var newHosts = {};
			if (req.body.host !== undefined) {
				if (req.body.host.name instanceof Array) {
					for (var i = 0; i < req.body.host.name.length; i++) {
						newHosts[req.body.host.name[i]] = {
							name: req.body.host.name[i],
							host: req.body.host.host[i]
						};
					}
				} else {
					newHosts[req.body.host.name] = {
						name: req.body.host.name,
						host: req.body.host.host
					};
				}
			}

			settings.hosts = newHosts;
			params.config.writeSettings(settings);
			saved = true;
		}

		res.render('settings', {
			title: 'Nodervisor - Settings',
			settings: settings,
			saved: saved
		});
	};
};