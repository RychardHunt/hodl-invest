'use strict';

var Q = require("q");
var Request = require("superagent");

var _baseUrl = null;
var _urlPrefix = null;
var _urlSuffix = null;

module.exports = {

	setBaseUrl: function(baseUrl) {
		_baseUrl = baseUrl;
	},

	setUrlPrefix: function(prefix) {
		_urlPrefix = prefix;
	},

	setUrlSuffix: function(suffix) {
		_urlSuffix = suffix;
	},

	create: function(resource) {


		var handleResponse = function(res, type, deferred){

			if (res.status == 401) {
				window.location = '/auth/login';
			} else if (res.status == 200) {
				deferred.resolve(res.body);
				dispatchUpdated(type, res.body);
			} else {
				deferred.reject(res.body);
			}
			
		};

		var ResourceApiService = {
			name: resource,
			getList: function(params) {

				var deferred = Q.defer();

				var url = _urlPrefix+"/"+resource;

				Request
					.get(url)
					.set('X-Requested-With', 'XMLHttpRequest')
					.query(params)
					.end(function(res) {

						handleResponse(res, 'fetchedList', deferred);

					})
				;

				return deferred.promise;

			},

			get: function(id, params) {

				var deferred = Q.defer();

				var url = _urlPrefix+"/"+resource+"/"+id;

				Request
					.get(url)
					.set('X-Requested-With', 'XMLHttpRequest')
					.query(params)
					.end(function(res) {

						handleResponse(res, 'fetched', deferred);

					})
				;

				return deferred.promise;
				
			},

			post: function(data) {

				var deferred = Q.defer();

				var url = _urlPrefix+"/"+resource;

				Request
					.post(url)
					.set('X-Requested-With', 'XMLHttpRequest')
					.send(data)
					.end(function(res) {

						handleResponse(res, 'created', deferred);

					})
				;

				return deferred.promise;

			},
			remove: function(id) {

				var deferred = Q.defer();

				var url = _urlPrefix+"/"+resource+"/"+id;
				
				Request
					.del(url)
					.set('X-Requested-With', 'XMLHttpRequest')
				  	.end(function(res){

						handleResponse(res, 'removed', deferred);

					});

				return deferred.promise;

			},
			put: function(id, data) {

				var deferred = Q.defer();

				var url = _urlPrefix+"/"+resource+"/"+id;
				
				Request
					.put(url)
					.set('X-Requested-With', 'XMLHttpRequest')
					.send(data)
					.end(function(res) {

						handleResponse(res, 'updated', deferred);

					});

				return deferred.promise;

			},

			customGet: function(suffix, params){
				
				var deferred = Q.defer();

				var url = _urlPrefix+"/"+resource+"/"+suffix;
				
				Request
					.get(url)
					.set('X-Requested-With', 'XMLHttpRequest')
					.query(params)
					.end(function(res) {

						handleResponse(res, 'customGet', deferred);

					});

				return deferred.promise;

			},

			customDelete: function(suffix, params){
				
				var deferred = Q.defer();

				var url = _urlPrefix+"/"+resource+"/"+suffix;
				
				Request
					.del(url)
					.set('X-Requested-With', 'XMLHttpRequest')
					.query(params)
					.end(function(res) {

						handleResponse(res, 'customDelete', deferred);

					});

				return deferred.promise;

			},

			customPost: function(suffix, payload, params){
				
				var deferred = Q.defer();

				var url = _urlPrefix+"/"+resource+"/"+suffix;
				
				Request
					.post(url)
					.set('X-Requested-With', 'XMLHttpRequest')
					.query(params)
					.send(payload)
					.end(function(res) {

						handleResponse(res, 'customPost', deferred);

					});

				return deferred.promise;


			},

			customPut: function(suffix, payload, params){
				
				var deferred = Q.defer();

				var url = _urlPrefix+"/"+resource+"/"+suffix;
				Request
					.put(url)
					.set('X-Requested-With', 'XMLHttpRequest')
					.query(params)
					.send(payload)
					.end(function(res) {

						handleResponse(res, 'customPut', deferred);

					});

				return deferred.promise;

			}

		};

		return ResourceApiService;

	}

};