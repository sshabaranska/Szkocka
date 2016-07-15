;(function() {
    'use strict';

    angular
        .module('rest')
        .factory('RestService', restService);

    /* ngInject */
    function restService($http, AppSettings, Assert) {

        return {
            /**
             * @private
             * @return {String}
             */
            _getBaseUrl: function() {
                return AppSettings.getAppServer();
            },

            /**
             * @public
             * @param {String} url
             * @param {Function} callback
             */
            getRequest: function(url, callback) {
                Assert.isString(url, 'Invalid "url" type');
                Assert.isFunction(callback, 'Invalid "callback" type');

                var fullUrl = this._getBaseUrl() + url;

                $http.get(fullUrl).then(
                    function(response) {
                        callback(null, response);
                    },
                    function(response) {
                        callback(response, null);
                    }
                );
            },

            /**
             * @public
             * @param {String} url
             * @param {Object} data
             * @param {Function} callback
             */
            postRequest: function(url, data, callback) {
                Assert.isString(url, 'Invalid "url" type');
                Assert.isObject(data, 'Invalid "data" type');
                Assert.isFunction(callback, 'Invalid "callback" type');

                var fullUrl = this._getBaseUrl() + url;

                $http.post(fullUrl, data).then(
                    function(response) {
                        callback(null, response);
                    },
                    function(response) {
                        callback(response, null);
                    }
                );
            },

            /**
             * @public
             * @param {String} url
             * @param {Object} data
             * @param {Function} callback
             */
            putRequest: function(url, data, callback) {
                Assert.isString(url, 'Invalid "url" type');
                Assert.isObject(data, 'Invalid "data" type');
                Assert.isFunction(callback, 'Invalid "callback" type');

                var fullUrl = this._getBaseUrl() + url;

                $http.put(fullUrl, data).then(
                    function(response) {
                        callback(null, response);
                    },
                    function(response) {
                        callback(response, null);
                    }
                );
            },

            /**
             * @public
             * @param {String} url
             * @param {Function} callback
             */
            deleteRequest: function(url, callback) {
                Assert.isString(url, 'Invalid "url" type');
                Assert.isFunction(callback, 'Invalid "callback" type');

                var fullUrl = this._getBaseUrl() + url;

                $http.delete(fullUrl).then(
                    function(response) {
                        callback(null, response);
                    },
                    function(response) {
                        callback(response, null);
                    }
                );
            }
        };
    };
})();