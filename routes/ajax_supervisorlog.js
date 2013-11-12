/*
 * GET downloadctl page.
 */

exports.ajax_supervisorlog = function(params) {
	var config = params.config;
	var supervisordapi = params.supervisordapi;

	return function(req, res) {

		if (!req.session.loggedIn) {
			res.send({error: 'Not logged in'});
		} else {
			var host = req.param('host');
			var process = req.param('process');
			var offset = parseInt(req.param('offset'), 10);
			var length = 16384;

			if (config.settings.hosts[host] !== undefined) {
				var supclient = supervisordapi.connect(config.settings.hosts[host].host);

				switch (req.param('type')) {
					case 'out': {
						if (offset === 0) {
							// If we dont know the offset to start, lets do two calls to fetch the current logsize and then offset
							supclient.tailProcessStdoutLog(process, 0, 0, function(err, data){
								offset = data[1] - length;
								supclient.tailProcessStdoutLog(process, offset, length, function(err, data){
									res.send({result: 'success', data: data});
								});
							});
						} else {
							supclient.tailProcessStdoutLog(process, offset, length, function(err, data){
								// For some reason it doesnt use the length properly, so trim it to expected length now
								length = data[1] - offset;
								var log = data[0];
								data[0] = log.substr(length * -1);
								res.send({result: 'success', data: data});
							});
						}
					}
					break;
					case 'err': {
						if (offset === 0) {
							// If we dont know the offset to start, lets do two calls to fetch the current logsize and then offset
							supclient.tailProcessStderrLog(process, 0, 0, function(err, data){
								offset = data[1] - length;
								supclient.tailProcessStderrLog(process, offset, length, function(err, data){
									res.send({result: 'success', data: data});
								});
							});
						} else {
							supclient.tailProcessStderrLog(process, offset, length, function(err, data){
								// For some reason it doesnt use the length properly, so trim it to expected length now
								length = data[1] - offset;
								var log = data[0];
								data[0] = log.substr(length * -1);
								res.send({result: 'success', data: data});
							});
						}
					}
					break;
				}
			} else {
				res.send({result: 'error', message: 'Host not found'});
			}
		}
	};
};