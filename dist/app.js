'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Defining the Port Variable


// importing bodyparser
var port = process.env.PORT || 8020;

// Instantiating express


// importring routes module
// Importing express
var app = new _express2.default();

// Registering middlewear bodyparser
app.use(_bodyParser2.default.json());

app.use(_bodyParser2.default.urlencoded({ extended: false }));
(0, _routes2.default)(app);

// Starting up the server
app.listen(port);

// Console message
console.log('server is running at http://localhost:' + port);

exports.default = app;