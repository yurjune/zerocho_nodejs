// 미들웨어간 데이터 공유
app.use((req, res, next) => {
  req.data = 'pass data'
  next();
})

app.get('/', (req, res) => {
  res.send(req.data);
})

// 미들웨어 확장법
// 미들웨어 안 미들웨어 사용
app.use('/', (req, res, next)=>{
  if(req.session.id) {
      express.static(__dirname, 'public')(req, res, next)
  } else {
      next();
  }
});

// 라우터 그룹화
// 주소는 같지만 메서드가 다른 코드가 있을때
router.route('/abc')
  .get((req, res) => {
    res.send('GET /abc');
  })
  .post((req, res) => {
    res.send('POST /abc');
  });