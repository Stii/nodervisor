/*
 * GET logout page
 */

exports.logout = function(params) {
	return function(req, res) {
		req.session.destroy();
		res.redirect('/');
	};
};