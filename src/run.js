#! /usr/bin/env node

import net from 'net';

const client = net.connect('1111', 'lemondigits.com');

client.on('data', data => {
  console.log(data.toString());
  process.stdin.once('data', chunk => {
    client.write(chunk.toString());
  });
}).on('connect', () => {
  console.log('Connected!');
}).on('end', () => {
  console.log('Disconnected!');
});
