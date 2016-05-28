'use strict';

const fetch = require('node-fetch');
const MOVIE_DB_KEY = require('../config/env').MOVIE_DB_KEY;
const MAX_AGE = require('../config/env').MAX_AGE;

const cache = {};

const checkCache = function (page) {
	return cache[page] && (Date.now() - cache[page].time) <= MAX_AGE;
};

module.exports = {
	getPageFromCache: function (req, res, next) {
		const page = req.params.page;

		if (!checkCache(page)) next();
		else res.json(cache[page].data);
	},

	getPage: function (req, res, next) {
		const page = req.params.page || '1';
		const query = `?api_key=${MOVIE_DB_KEY}&page=${page}`;
		const url = `http://api.themoviedb.org/3/movie/now_playing${query}`;

		fetch(url)
		.then(response => response.json())
		.then(response => cache[page] = { data: response, time: Date.now() })
		.then(() => res.json(cache[page].data))
		.catch(next);
	}
};
