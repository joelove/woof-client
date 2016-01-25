#! /usr/bin/env node
'use strict';

var _net = require('net');

var _net2 = _interopRequireDefault(_net);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var client = _net2.default.connect('1111', 'lemondigits.com');

client.on('data', function (data) {
  console.log('' + data);
  process.stdin.once('data', function (chunk) {
    client.write(chunk.toString());
  });
}).on('connect', function () {
  console.log('Connected!');
}).on('end', function () {
  console.log('Disconnected!');
});