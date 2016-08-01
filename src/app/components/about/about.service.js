;(function() {
    'use strict';

    angular
        .module('about')
        .factory('aboutService', aboutService);

    /* ngInject */
    function aboutService($q, $http, API_URL, Assert) {
        return {

            /**
             * Get "About" information
             * public
             * @return {Promise}
             */
            getContent: function() {
                return $q.resolve($http.get(API_URL + 'pages/about'));
            },

            /**
             * @public
             * @param {Object} params
             */
            updateAboutInfo: function(params) {
                Assert.isObject(params, 'Invalid "params" type');
                Assert.isString(params.content, 'Invalid "params.content" type');

                return $q.resolve($http.post(API_URL + 'pages/about', params));
            }
        };
    }
})();