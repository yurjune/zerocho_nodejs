const mongoose = require('mongoose');

const connect = () => {
  if (process.env.NODE_ENV !== 'production') {
    mongoose.set('debug', true);  // 디버그 true: query를 console에서 체크 가능
  }
  mongoose.connect('mongodb://root:nodejsbook@localhost:27017/admin', { // 로그인을 위한 db
    dbName: 'nodejs', // 실제 사용할 db
    useNewUrlParser: true,
    useCreateIndex: true,
  }, (error) => {
    if (error) {
      console.log('몽고디비 연결 에러', error);
    } else {
      console.log('몽고디비 연결 성공');
    }
  });
};

mongoose.connection.on('error', (error) => {
  console.error('몽고디비 연결 에러', error);
});
mongoose.connection.on('disconnected', () => {
  console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
  connect();
});

module.exports = connect;
