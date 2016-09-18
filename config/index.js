var nconf = require('nconf');
var path = require('path');

nconf.argv()
    .env()
    .file("adminConfig", {file: path.join(__dirname, 'config.json')});

module.exports = nconf;
