#! /usr/bin/env node

import net from 'net';
import blessed from 'blessed';

const screen = blessed.screen({ smartCSR: true });
const client = net.connect('1111', 'lemondigits.com');
const theme = require('../themes/default.json');

const buffer = blessed.box(theme.buffer);
const input = blessed.textbox(theme.input);
const sidebar = blessed.list(theme.sidebar);
const statusbar = blessed.box(theme.statusbar);

const exit = () => process.exit(0);
const connected = () => append('Connection established!');

const append = data => {
  buffer.pushLine(data.toString());
  screen.render();
}

const focus = () => {
  input.focus();
  screen.render();
}

const clear = () => {
  input.clearValue();
  focus();
}

const write = () => {
  client.write(input.getContent());
  clear();
}

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
