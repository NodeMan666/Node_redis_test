'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
let express 	= require('express');
let bodyParser 	= require("body-parser");
let morgan     	= require("morgan");
let config 		= require('./config/config.json')
// Setup server
let app = express();
app.use(morgan('dev') ); // Log every request to console
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
let server = require('http').createServer(app);

require('./routes')(app);

// Start server
server.listen(config.server.port, config.server.ip, () => {
  console.log('Express server listening on %d, in %s mode', config.server.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
