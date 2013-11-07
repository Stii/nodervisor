/*
 * GET/POST login page
 */

exports.login = function(params) {
	return function(req, res) {
		
		if (req.session.loggedIn) {
			res.redirect('/');
		}

		if (req.body.submit !== undefined) {
			var email = req.body.email;
			params.db('users')
				.where('Email', email)
				.exec(function(err, user){
					var error = 'Password failed';
					if (user !== null) {
						bcrypt = require('bcrypt');
						req.session.loggedIn = bcrypt.compareSync(req.body.password, user[0].Password);
					} else {
						error = 'Email not found';
					}
					
					if (!req.session.loggedIn) {
						res.render('login', {
							title: 'Nodervisor - Login',
							error: error
						});
					} else {
						req.session.user = user[0];
						res.redirect('/');
					}
				});
		} else {
			res.render('login', {
				title: 'Nodervisor - Login',
			});
		}
	};
};