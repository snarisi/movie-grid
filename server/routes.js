'use strict';

const router = require('express').Router();
const moviesCtrl = require('./controllers/movies.controller');

router.get('/api/movies/:page', moviesCtrl.getPageFromCache, moviesCtrl.getPage);

module.exports = router;
