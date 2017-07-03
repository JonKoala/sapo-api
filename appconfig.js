var fs = require('fs')

var configFile = fs.readFileSync('appconfig.json');
var appconfig = JSON.parse(configFile);

module.exports = appconfig;
