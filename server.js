const jsonServer = require('json-server');
const path = require('path');
const express = require('express');
const app = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults({ static: './build' });
const port = process.env.PORT || 5000;

app.use(middlewares);
app.use(jsonServer.rewriter({ '/api/*': '/$1', })) 
app.use(router);

// app.use('/db', middlewares, router);
app.use(express.static(path.join(__dirname, 'build')));


app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => console.log('server is running'))