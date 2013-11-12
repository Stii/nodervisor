/*
 * GET log page
 */

exports.log = function(params) {
	var config = params.config;
	return function(req, res) {
		
		if (!req.session.loggedIn) {
			res.redirect('/login');
		}

		if (req.params.host && req.params.process) {
			var data = {};
			if (config.settings.hosts[req.params.host] !== undefined) {
				data.host = config.settings.hosts[req.params.host];
			} else {
				data.error = "Host not found";
			}
			res.render('log', {
				title: 'Nodervisor - Log',
				session: req.session,
				data: data,
				host: req.params.host,
				process: req.params.process,
				type: req.params.type
			});
		}
	};
};