#! /usr/bin/env node

import net from 'net';
import blessed from 'blessed';
import contrib from 'blessed-contrib';
import theme from '../themes/default';

const screen = blessed.screen({ smartCSR: true });
const input = blessed.textbox(theme.input);
const buffer = blessed.box(theme.buffer);
const sidebar = blessed.list(theme.sidebar);
const statusbar = blessed.box(theme.statusbar);
const log = contrib.log(theme.log);

const exit = () => process.exit(0);
const focus = () => input.focus();
const connected = () => log.log('Connection established!');

const append = data => {
  log.log('DATA:' + data);
  buffer.pushLine(data.toString());
}

const write = () => {
  const line = input.getContent();
  log.log('INPUT:' + line);
  client.write(line);
  input.clearValue();
  focus();
}

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

const client = net.connect('1111', 'lemondigits.com');

client.on('data', append);
client.on('connect', connected);
client.on('end', exit);

screen.render();
