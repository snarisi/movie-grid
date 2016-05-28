'use strict';

const router = require('express').Router();
const fetch = require('node-fetch');
const key = require('../../../config/env').MOVIE_DB_KEY;

const cache = {};

router.get('/:page', function (req, res, next) {
	const page = req.params.page;

	if (!cache[page]) next();
	else res.json(cache[page]);
});

router.get('/:page', function (req, res, next) {
	const page = req.params.page || '1';
	const query = `?api_key=${key}&page=${page}`;
	const url = `http://api.themoviedb.org/3/movie/now_playing${query}`;

	fetch(url)
		.then(response => response.json())
		.then(response => cache[page] = response)
		.then(() => res.json(cache[page]))
		.catch(next);
})

module.exports = router;
