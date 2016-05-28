'use strict';

const router = require('express').Router();
const fetch = require('node-fetch');
const key = require('../../config/env').MOVIE_DB_KEY;

router.get('/movies/:page', function (req, res, next) {
	const query = `?api_key=${key}&page=${req.params.page}`;
	const url = `http://api.themoviedb.org/3/movie/now_playing${query}`;

	fetch(url)
		.then(response => response.json())
		.then(response => res.json(response))
		.catch(next);
})

module.exports = router;
