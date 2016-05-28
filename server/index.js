'use strict';

const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 8080;
const api = require('./api');

// logging
app.use(function(req, res, next) {
	console.log(req.method, ' ', req.path);
	next();
});

// static routes
const publicPath = path.join(__dirname, '../public');
const nodeModulesPath = path.join(__dirname, '../node_modules');
const clientPath = path.join(__dirname, '../client');
app.use(express.static(publicPath));
app.use(express.static(nodeModulesPath));
app.use(express.static(clientPath));

// api
app.use('/api', api);

// catch-all route to load index.html
app.get('*', function (req, res, next) {
	res.sendFile(`${publicPath}/index.html`)
});

// error handling
app.use(function (err, req, res, next) {
	const status = err.status || 500;
	res.send(err.message || 'Internal server error');
});

app.listen(port, () => console.log('Sever listening on port ', port));
