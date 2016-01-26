#! /usr/bin/env node
'use strict';

var _net = require('net');

var _net2 = _interopRequireDefault(_net);

var _blessed = require('blessed');

var _blessed2 = _interopRequireDefault(_blessed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var screen = _blessed2.default.screen({ smartCSR: true });
var client = _net2.default.connect('1111', 'lemondigits.com');

var buffer = _blessed2.default.text({
  top: 0,
  left: 0,
  width: '80%',
  height: '100%-2',
  scrollable: true,
  style: {
    fg: 'black',
    bg: '#f0f0f0'
  }
});

var input = _blessed2.default.textbox({
  bottom: 1,
  left: 0,
  width: '80%',
  height: 1,
  inputOnFocus: true,
  style: {
    fg: 'black',
    bg: '#d3d3d3',
    hover: {
      bg: '#b3b3b3'
    },
    focus: {
      bg: '#b3b3b3'
    }
  }
});

var sidebar = _blessed2.default.list({
  right: 0,
  top: 0,
  width: '20%',
  height: '100%-1',
  style: {
    fg: 'black',
    bg: '#fafafa'
  }
});

var statusbar = _blessed2.default.box({
  bottom: 0,
  width: '100%',
  height: 1,
  style: {
    fg: 'black',
    bg: '#999999'
  }
});

screen.title = 'WOOF';
screen.append(buffer);
screen.append(input);
screen.append(sidebar);
screen.append(statusbar);

input.on('click', function (data) {
  input.focus();
  screen.render();
});

screen.key(['escape', 'C-c'], function (ch, key) {
  return process.exit(0);
});

client.on('data', function (data) {
  buffer.pushLine(data.toString());
  screen.render();
}).on('connect', function () {
  // console.log('Connected!');
}).on('end', function () {
  // console.log('Disconnected!');
});

input.key('enter', function (ch, key) {
  client.write(input.getContent());
  input.clearValue();
  input.focus();
  screen.render();
});

input.focus();
screen.render();