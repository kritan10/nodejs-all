import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' });
});

app.post('/update', (req, res) => {
  console.log(req.body);
  res.status(200).redirect('/');
});

app.listen(3000, () => {
  console.log('Express-Pug server listening on port 3000');
});
