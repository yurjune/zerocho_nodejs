// url 모듈: 인터넷 주소를 쉽게 조작하도록 도와주는 모듈
const url = require('url');
const _url = 'http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor'

// 1 WHATWG 방식
const { URL } = url;
const myURL = new URL(_url);  // 구문분석
console.log('new URL():', myURL);
console.log('------------------------------');

// 2 기존 노드 방식
const parsedUrl = url.parse(_url);  // 구문분석
console.log('url.parse():', parsedUrl);
