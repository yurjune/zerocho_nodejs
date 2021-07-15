const http = require("http");

const server = http.createServer((req, res) => {
  // 브라우저에게 html인걸 알려주기 + 한글인거 알려주기
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'})
  // 스트림
  res.write("<h1>Hello Node!</h1>");
  res.write("<p>Hello server</p>");
  res.end("<p>Hello Zerocho</p>") ;
})
  .listen(8080);  // 프로세스 올리기: 8080 port

server.on('listening', () => {
  console.log('8080번 포트가 서버에서 대기 중입니다.');
});

server.on('error', (error) => {
  console.error(error)
});
