// 워커쓰레드는 쓰레드를 여러개 만듬
// 클러스터는 프로세스를 여러개 만듬

const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`마스터 프로세스 아이디: ${process.pid}`);
  // CPU 개수만큼 워커를 생산(워커쓰레드 아니고 워커프로세스)
  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork(); // 프로세스 생성
  }
  // 워커가 종료되었을 때
  cluster.on('exit', (worker, code, signal) => {
    console.log(`${worker.process.pid}번 워커가 종료되었습니다.`);
    console.log('code', code, 'signal', signal);
    cluster.fork();  // 서버가 종료되었을 때 다시 살리기
  });
} else {
  // 워커들이 포트에서 대기
  http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Cluster!</p>');
    setTimeout(() => { // 워커 존재를 확인하기 위해 1초마다 강제 종료
      process.exit(1);
    }, 1000);
  }).listen(8086);  // 복수의 서버를 하나의 포트에 묶어놓음

  console.log(`${process.pid}번 워커 실행`);
}