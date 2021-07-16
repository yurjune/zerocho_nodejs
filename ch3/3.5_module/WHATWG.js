// 1 WHATWG방식
const { URL } = require('url');
const myURL = new URL('http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript');

// 2 URL방식
const url = require('url');
const myURL = url.parse('http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript');
