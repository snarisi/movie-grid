'use strict';

const supertest = require('supertest-as-promised');
const expect = require('chai').expect;
const sinon = require('sinon');
const _ = require('lodash');
const moviesCtrl = require('../server/controllers/movies.controller');

const apiSpy = sinon.spy(moviesCtrl, 'getPage');
const cacheSpy = sinon.spy(moviesCtrl, 'getPageFromCache');

const app = require('../server');
const request = supertest(app);

afterEach(function () {
	apiSpy.reset();
	cacheSpy.reset();
});

after(function () {
	moviesCtrl.getPage.restore();
	moviesCtrl.getPageFromCache.restore();
});

describe('GET /api/movies/:page', function () {
	it('returns an object with array of movie objects', function () {
		return request.get('/api/movies/1')
			.expect(200)
			.then(res => res.body)
			.then(body => {
				expect(body.page).to.equal(1);
				expect(body.results).to.be.a('array');
			});
	});

	it('should check the cache before making an api call', function () {
		return request.get('/api/movies/2')
			.expect(200)
			.then(res => res.body)
			.then(body => {
				expect(cacheSpy.callCount).to.equal(1);
			});
	});

	it('should not make an api if the page is in the cache', function () {
		let results;

		return request.get('/api/movies/3')
			.then(res => res.body)
			.then(body => results = body)
			.then(() => expect(apiSpy.callCount).to.equal(1))
			.then(() => request.get('/api/movies/3'))
			.then(res => res.body)
			.then(body => {
				expect(_.isEqual(results, body)).to.be.true;
				expect(apiSpy.callCount).to.equal(1);
			});
	});
});
