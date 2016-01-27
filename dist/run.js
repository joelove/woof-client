#! /usr/bin/env node
'use strict';

var _net = require('net');

var _net2 = _interopRequireDefault(_net);

var _blessed = require('blessed');

var _blessed2 = _interopRequireDefault(_blessed);

var _blessedContrib = require('blessed-contrib');

var _blessedContrib2 = _interopRequireDefault(_blessedContrib);

var _default = require('../themes/default');

var _default2 = _interopRequireDefault(_default);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var screen = _blessed2.default.screen({ smartCSR: true });
var input = _blessed2.default.textbox(_default2.default.input);
var buffer = _blessed2.default.box(_default2.default.buffer);
var sidebar = _blessed2.default.list(_default2.default.sidebar);
var statusbar = _blessed2.default.box(_default2.default.statusbar);
var log = _blessedContrib2.default.log(_default2.default.log);

var exit = function exit() {
  return process.exit(0);
};
var focus = function focus() {
  return input.focus();
};
var connected = function connected() {
  return log.log('Connection established!');
};

var append = function append(data) {
  log.log('DATA:' + data);
  buffer.pushLine(data.toString());
};

var write = function write() {
  var line = input.getContent();
  log.log('INPUT:' + line);
  client.write(line);
  input.clearValue();
  focus();
};

screen.title = 'WOOF';
screen.key(['escape'], exit);
screen.append(buffer);
screen.append(input);
screen.append(sidebar);
screen.append(statusbar);
screen.append(log);

input.on('click', focus);
input.key('enter', write);
input.focus();

var client = _net2.default.connect('1111', 'lemondigits.com');

client.on('data', append);
client.on('connect', connected);
client.on('end', exit);

screen.render();