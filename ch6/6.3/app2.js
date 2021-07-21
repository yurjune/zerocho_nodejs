const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.json());  
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  req.data = 'something'
  next();
})

app.get('/', (req, res) => {
  res.send(req.data);
  // res.send('hello');
})

app.use((req, res, next) => {
  res.send('404지롱');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.send('에러났음, 근데 안알려줄거임');
})

app.listen(app.get('port'), () => {
  console.log(`${app.get('port')} server is listening`);
})