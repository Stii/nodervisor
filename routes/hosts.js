/*
 * GET/POST hosts page
 */

exports.hosts = function(params) {
	var config = params.config;
	var db = params.db;
	return function(req, res) {

		if ((!req.session.loggedIn) || (req.session.user.Role != 'Admin')) {
			res.redirect('/login');
		}

		var saved = false;
		var hosts = params.config.hosts;
		
		if (req.body.submit !== undefined) {
			var newHosts = [];
			if (req.body.host !== undefined) {
				// Using the posted data to actually construct the data objects to pass to db writes.
				// Because its easier this way. (and it used to be stored in json file)
				if (req.body.host.idHost instanceof Array) {
					for (var i = 0; i < req.body.host.idHost.length; i++) {
						newHosts.push({
							idHost: req.body.host.idHost[i],
							Name: req.body.host.Name[i],
							Url: req.body.host.Url[i]
						});
					}
				} else {
					newHosts.push({
						idHost: req.body.host.idHost,
						Name: req.body.host.Name,
						Url: req.body.host.Url
					});
				}
			}

			// Save and render
			params.config.writeHosts(db, newHosts, function(err){
				if (!err){
					saved = true;
				}
				res.render('hosts', {
					title: 'Nodervisor - Hosts',
					hosts: params.config.hosts,
					saved: saved,
					error: err,
					session: req.session
				});
			});
		} else {
			res.render('hosts', {
				title: 'Nodervisor - Hosts',
				hosts: hosts,
				saved: saved,
				error: null,
				session: req.session
			});
		}
	};
};