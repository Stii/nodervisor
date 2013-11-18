var config = {};

// Db
config.db = {
	host: 'localhost',
	user: 'root',
	pass: '',
	name: 'nodervisor',
};

// Application
config.port = 3000;
config.env = 'production';

// Read and write settings
config.readHosts = function(db, callback){
	var query = db('hosts')
		.join('groups', 'hosts.idGroup', '=', 'groups.idGroup', 'left')
		.select('hosts.idHost', 'hosts.Name', 'hosts.Url', 'groups.Name AS GroupName');
	
	query.exec(function(err, data){
		var hosts = {};
		for (var host in data) {
			hosts[data[host].idHost] = data[host];
		}
		config.hosts = hosts;
		// Call the callback passed
		if (callback) {
			callback();
		}
	});
};

config.writeHosts = function(db, newHosts, callback){
	var async = require('async');
	var hostIds = [];
	async.each(newHosts, function(host, callback){
		if (host.idHost == '0') {
			db('hosts').insert({Name: host.Name, Url: host.Url}).exec(function(err, id){
				hostIds.push(Number(id));
				return callback(err);
			});
		} else {
			db('hosts').where('idHost', host.idHost).update({Name: host.Name, Url: host.Url}).exec(function(err){
				hostIds.push(parseInt(host.idHost, 10));
				return callback(err);
			});
		}
	}, function(err){
		if (err) {
			callback(err);
		} else {
			db('hosts').whereNotIn('idHost', hostIds).delete().exec(function(err){
				if (err) {
					callback(err);
				} else {
					config.readHosts(db, callback);
				}
			});
		}
	});
};

module.exports = config;