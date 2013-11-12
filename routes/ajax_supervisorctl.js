/*
 * GET downloadctl page.
 */

exports.ajax_supervisorctl = function(params) {
	var config = params.config;
	var supervisordapi = params.supervisordapi;

	return function(req, res) {

		if (!req.session.loggedIn) {
			res.send({error: 'Not logged in'});
		} else {
			if (req.session.user.Role != 'Admin') {
				res.send({error: 'Incorrect Priviledges!'});
				return false;
				} else {
					var querystring = require('querystring');
				var host = req.param('host');
				var process = req.param('process');
				var action = req.param('action');

				if (config.settings.hosts[host] !== undefined) {
					var supclient = supervisordapi.connect(config.settings.hosts[host].host);
					switch (action) {
						case 'stop': {
							supclient.stopProcessGroup(process, function(){
								res.send({result: 'success'});
							});
						}
						break;
						case 'start': {
							supclient.startProcess(process, function(){
								res.send({result: 'success'});
							});
						}
						break;
						case 'restartAll': {
							supclient.stopAllProcesses(true, function(){
								supclient.startAllProcesses(true, function(){
									res.send({result: 'success'});
								});
							});
						}
						break;
					}
				} else {
					res.send({result: 'error', message: 'Host not found'});
				}
			}
		}
	};
};