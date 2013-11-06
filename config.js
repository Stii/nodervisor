var config = {};

// Application
config.port = 3000;
config.settingsFile = 'settings.json';
config.env = 'development';

// Read and write settings
config.readSettings = function(){
	fs = require('fs');
	fs.readFile(config.settingsFile, function(err, data) {
		if (!err) {
			config.settings = JSON.parse(data);
		} else {
			config.settings = {
				hosts: {
					'Localhost': {
						host: 'http://127.0.0.1:9001',
						name: 'Localhost'
					}
				}
			};
		}
	});
};

config.writeSettings = function(newSettings){
	fs = require('fs');
	fs.writeFile(config.settingsFile, JSON.stringify(newSettings), function(){
		config.readSettings();
	});
};

module.exports = config;