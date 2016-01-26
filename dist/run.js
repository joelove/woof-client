#! /usr/bin/env node
'use strict';

var _net = require('net');

var _net2 = _interopRequireDefault(_net);

var _blessed = require('blessed');

var _blessed2 = _interopRequireDefault(_blessed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var screen = _blessed2.default.screen({ smartCSR: true });
var client = _net2.default.connect('1111', 'lemondigits.com');
var theme = require('../themes/default.json');

var buffer = _blessed2.default.text(theme.buffer);
var input = _blessed2.default.textbox(theme.input);
var sidebar = _blessed2.default.list(theme.sidebar);
var statusbar = _blessed2.default.box(theme.statusbar);

var exit = function exit() {
  return process.exit(0);
};
var connected = function connected() {
  return append('Connection established!');
};

var append = function append(data) {
  buffer.pushLine(data.toString());
  screen.render();
};

var focus = function focus() {
  input.focus();
  screen.render();
};

var clear = function clear() {
  input.clearValue();
  focus();
};

var write = function write() {
  client.write(input.getContent());
  clear();
};

input.on('click', focus);
input.key(['escape'], exit);
input.key('enter', write);

client.on('data', append);
client.on('connect', connected);
client.on('end', exit);

screen.title = 'WOOF';
screen.append(buffer);
screen.append(input);
screen.append(sidebar);
screen.append(statusbar);

input.focus();
screen.render();