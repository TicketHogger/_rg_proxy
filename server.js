require('newrelic');
const express = require('express');
const path = require('path');
const app = express();
const proxy = require('http-proxy-middleware');
const compression = require('compression');

app.use(compression());

app.get('/loaderio-82c8cf31870451202c78fb4532dcfd87', (req, res)=> {
  res.send('loaderio-82c8cf31870451202c78fb4532dcfd87');
})

app.get('/', (req, res) => {
  res.redirect('movies/1');
})

app.use(express.static(path.join(__dirname, 'public')));

app.get("/movies/:id", function(req, res) {
  const reactPath = path.join(__dirname, "public/index.html");
  res.sendFile(reactPath);
});

app.use('/api/movies/:movieId/summary', 
  proxy({
    target: 'http://http://18.224.29.254'
  })
)

app.use('/api/movies/:movieid/rating', 
  proxy({
    target: 'http://18.224.5.63/'
  })
)

app.get('/api/movies/:movieid/reviews', 
  proxy({
    target: 'http://18.224.5.63/'
  })
)

app.get('/api/movies/:genre/relatedmovies',
  proxy({
    target: 'http://http://3.17.77.149'
  })
)

app.get('/api/movies/:movie/:date/:location',
  proxy({
    target: 'http://18.236.197.104'
  })
)

app.get('/api/moviesbyid/:movieid/:date/:location',
  proxy({
    target: 'http://18.236.197.104'
  })
)

app.listen(3000, () => {
  console.log('listening at port 3000');
})
