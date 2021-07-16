// url 모듈: 인터넷 주소를 쉽게 조작하도록 도와주는 모듈
const url = require('url');

// 1 WHATWG 방식
const { URL } = url;
const myURL = new URL('http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor');
console.log('new URL():', myURL);
console.log('url.format():', url.format(myURL));
console.log('------------------------------');

// 2 기존 노드 방식
const parsedUrl = url.parse('http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor');
console.log('url.parse():', parsedUrl);
console.log('url.format():', url.format(parsedUrl));
