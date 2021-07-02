// 노드 EventEmitter 간단구현

function Emitter() {
  this.events = {};
}

let emitter = new Emitter();

// on함수: 리스너 등록
Emitter.prototype.on = function(type, listener) {
  this.events[type] = this.events[type] || [];  // type을 key로 받고 listener의 배열을 value로 받는다
  this.events[type].push(listener);
}
emitter.on("greetings", () => console.log("hi friends"))
emitter.on("greetings", () => console.log("hi you"))
emitter.on("farewell", () => console.log("bye"))

// console.log(emitter.events)

// emit함수: 리스너 실행
Emitter.prototype.emit = function(type) {
  if (this.events[type]) {
    this.events[type].forEach(function(listener){
      listener();
    })
  }
}
emitter.emit("greetings")
emitter.emit("farewell")

// 실제 소스코드: https://github.com/nodejs/node/blob/v12.14.1/lib/events.js
