const jsonServer = require('');
const path = require('path');
const express = require('express');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults({ static: './build' });
const port = process.env.PORT || 5000;

server.use(middlewares);
server.use(jsonServer.rewriter({ '/api/*': '/$1', })) 
server.use(router);

// server.use(jsonServer.rewriter({ '/api/*': '/$1', }), middlewares, router);
// server.use(express.static(path.join(__dirname, 'build')));
server.get('/*', function (req, res) {
    console.log('***')
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

server.listen(port, () => console.log('server is running'))