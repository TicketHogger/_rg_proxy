const express = require('express');
const path = require('path');
const app = express();
const proxy = require('http-proxy-middleware');
const compression = require('compression');

app.use(compression());

// app.get('/', (req, res) => {
//   res.redirect('movies/1');
// })

app.use(express.static(path.join(__dirname, 'public')));

// app.get("/movies/:id", function(req, res) {
//   const reactPath = path.join(__dirname, "public/index.html");
//   res.sendFile(reactPath);
// });

app.use('/api/movies/:movieId/summary', 
  proxy({
    target: 'http://localhost:3007'
  })
)

app.use('/api/movies/:movieid/rating', 
  proxy({
    target: 'http://localhost:3013'
  })
)

app.get('/api/movies/:movieid/reviews', 
  proxy({
    target: 'http://localhost:3013'
  })
)

app.get('/api/movies/:genre/relatedmovies',
  proxy({
    target: 'http://localhost:3003'
  })
)

app.get('/api/movies/:movie/:date/:location',
  proxy({
    target: 'http://localhost:3002'
  })
)

app.get('/api/moviesbyid/:movieid/:date/:location',
  proxy({
    target: 'http://localhost:3002'
  })
)

app.listen(3000, () => {
  console.log('listening at port 3000');
})
