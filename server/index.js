'use strict';

const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 8080;

// logging
app.use(function(req, res, next) {
	console.log(req.method, ' ', req.path);
	next();
});

// api
app.use('/api', require('./api'));

// static routes
app.use(require('./static'));

// catch-all route to load index.html
app.get('*', function (req, res, next) {
	res.sendFile(path.join(__dirname, '../public/index.html'))
});

// error handling
app.use(function (err, req, res, next) {
	const status = err.status || 500;
	res.send(err.message || 'Internal server error');
});

app.listen(port, () => console.log('Sever listening on port ', port));
