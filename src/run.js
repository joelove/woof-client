#! /usr/bin/env node

import net from 'net';
import blessed from 'blessed';

const screen = blessed.screen({ smartCSR: true });
const client = net.connect('1111', 'lemondigits.com');

const buffer = blessed.text({
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

const input = blessed.textbox({
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

const sidebar = blessed.list({
  right: 0,
  top: 0,
  width: '20%',
  height: '100%-1',
  style: {
    fg: 'black',
    bg: '#fafafa'
  }
});

const statusbar = blessed.box({
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

input.on('click', function(data) {
  input.focus();
  screen.render();
});

screen.key(['escape', 'C-c'], function(ch, key) {
  return process.exit(0);
});

client.on('data', data => {
  buffer.pushLine(data.toString());
  screen.render();
}).on('connect', () => {
  // console.log('Connected!');
}).on('end', () => {
  // console.log('Disconnected!');
});

input.key('enter', function(ch, key) {
  client.write(input.getContent());
  input.clearValue();
  input.focus();
  screen.render();
});

input.focus();
screen.render();
