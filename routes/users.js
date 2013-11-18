/*
 * GET/POST settings page
 */

exports.users = function(params) {
	return function(req, res) {
		
		if ((!req.session.loggedIn) || (req.session.user.Role != 'Admin')) {
			res.redirect('/login');
		}

		var saving = false;
		
		if (req.body.submit !== undefined) {
			if (req.params.idUser) {
				saving = true;
				// Hash password using bcrypt
				var bcrypt = require('bcrypt');
				var salt = bcrypt.genSaltSync(10);
				var hash = bcrypt.hashSync(req.body.password, salt);

				if (req.params.idUser == 'new') {
					params.db('users').insert({
							Name: req.body.name,
							Email: req.body.email,
							Password: hash,
							Role: req.body.role
						}, 'id').exec(function(err, insertId){
							if (err !== null) {
								console.log(err);
								res.redirect('/users');
							} else {
								res.redirect('/user/' + insertId);
							}
						});
				} else {
					var info = {
						Name: req.body.name,
						Email: req.body.email,
						Role: req.body.role
					};

					if (req.body.password !== '') {
						info.Password = hash;
					}

					params.db('users').update(info)
						.where('id', req.params.idUser)
						.exec(function() {
							res.redirect('/user/' + req.params.idUser);
						});
				}
			}
		}

		if (req.body.delete !== undefined) {
			if (req.params.idUser) {
				saving = true;
				params.db('users').delete()
					.where('id', req.params.idUser)
					.exec(function() {
						res.redirect('/users');
					});
			}
		}

		if (saving === false) {
			var qry = params.db('users');

			if (req.params.idUser) {
				if (req.params.idUser == 'new') {
					res.render('edit_user', {
						title: 'Nodervisor - Edit User',
						user: null,
						session: req.session
					});
				} else {
					qry.where('id', req.params.idUser)
						.exec(function(err, user){
							res.render('edit_user', {
								title: 'Nodervisor - Edit User',
								user: user[0],
								session: req.session
							});
						});
				}
			} else {
				qry.exec(function(err, users){
					res.render('users', {
						title: 'Nodervisor - Users',
						users: users,
						session: req.session
					});
				});
			}
		}
	};
};