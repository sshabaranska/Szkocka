;(function() {
    'use strict';

    angular
        .module('about')
        .factory('aboutService', aboutService);

    /* ngInject */
    function aboutService($http, API_URL, Assert) {
        return {

            /**
             * public
             * @return {Promise}
             */
            get: function() {
                return $http.get(API_URL + 'pages/about');
            },

            /**
             * @public
             * @param {Object} params
             * @return {Promise}
             */
            update: function(params) {
                Assert.isObject(params, 'Invalid "params" type');
                Assert.isString(params.content, 'Invalid "params.content" type');

                return $http.post(API_URL + 'pages/about', params);
            }
        };
    }
})();
