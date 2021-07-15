const fs = require('fs').promises;
const http = require('http');
const url = require('url');
const qs = require('querystring');

const sessions = {};

const parseCookie = (cookie='') => 
  cookie
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});

http.createServer(async (req, res) => {
  const cookies = parseCookie(req.headers.cookie);
  if (req.url === '/login') {
    const { query }= url.parse(req.url);
    const { name }= qs.parse(query);
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 5);
    const uniqueInt = Date.now();
    session[uniqueInt] = {
      name,
      expires,
    }
    res.writeHead(302, {
      location: '/',
      'Set-Cookie': `session=${uniqueInt}; Expires=${expires.toGMTString()}; HttpOnly; path=/`
    });
    res.end();
  }
})