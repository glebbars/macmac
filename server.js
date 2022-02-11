const express = require('express');
const jsonServer =  require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults({ static: './build' });
const port = process.env.PORT || 5000;
const app = express();

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

server.use(middlewares);
server.use(jsonServer.rewriter({ '/api/*': '/$1', })) 
server.use(router);

server.listen(port, () => { console.log('Server is running')})