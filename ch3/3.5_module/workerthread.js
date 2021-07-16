const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) { // 부모스레드
  const worker = new Worker(__filename);
  worker.on('message', value => console.log('from worker', value));
  worker.on('exit', () => console.log('worker exit'));
  worker.postMessage('ping');
} else { // 워커스레드
  parentPort.on('message', (value) => {
    console.log('from parent', value);
    parentPort.postMessage('pong');
    parentPort.close();
  });
}