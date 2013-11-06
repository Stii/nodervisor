/*
 * GET supervisord page
 */

exports.supervisord = function(params) {
	return function(req, res) {
		res.render('supervisord', {
			title: 'Nodervisor - All Hosts'
		});
	};
};