#! /usr/bin/env node

import net from 'net';
import blessed from 'blessed';
import contrib from 'blessed-contrib';
import theme from '../themes/default';
import config from '../config';

const screen = blessed.screen({ smartCSR: true });
const input = blessed.textarea(theme.input);
const buffer = blessed.box(theme.buffer);
const sidebar = blessed.list(theme.sidebar);
const statusbar = blessed.box(theme.statusbar);
const log = contrib.log(theme.log);
const client = net.connect(config.port, config.server);

const exit = () => process.exit(0);
const focus = () => input.focus();
const connected = () => log.log('Connection established!');

const append = data => {
  buffer.pushLine(data.toString());
  buffer.setScrollPerc(100);
  log.log(`DATA: ${data.toString()}`);
};

const write = () => {
  const line = input.getContent();
  client.write(`${line}\n`);
  input.clearValue();
  focus();
  log.log(`INPUT: ${line}\n`);
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

client.on('data', append);
client.on('connect', connected);
client.on('end', exit);

screen.render();
