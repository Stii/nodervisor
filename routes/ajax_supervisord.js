/*
 * GET supervisords json data
 */

exports.ajax_supervisord = function(params) {
	var config = params.config;
	var supervisordapi = params.supervisordapi;
	var async = require('async');
	return function(req, res) {
		
		var supervisords = {};
		var hosts = [];
		for (var hostName in config.settings.hosts) {
			hosts.push(config.settings.hosts[hostName]);
		}
		async.each(hosts, function(host, callback){
			var supclient = supervisordapi.connect(host.host);
			var processinfo = supclient.getAllProcessInfo(function(err, result){
				if (err === null) {
					supervisords[host.name] = result;
					return callback();
				} else {
					supervisords[host.name] = err;
					return callback();
				}
			});
		}, function(err){
			res.send(supervisords);
		});
	};
};