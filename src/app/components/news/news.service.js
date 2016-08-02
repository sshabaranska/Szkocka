;(function() {
    'use strict';

    angular
        .module('news')
        .factory('newsService', newsService);

    /* ngInject */
    function newsService($http, API_URL, Assert, Type) {
        return {
            /**
             * @public
             * @param {String} cursor - optional
             * @return {Promise}
             */
            getNews: function(cursor) {
                /** @private {String} */
                var query = '';

                if (Type.isString(cursor)) {
                    query = '?cursor=' + cursor;
                }
                return $http.get(API_URL + 'news' + query);
            },

            /**
             * @public
             * @param {Object} params
             * @return {Promise}
             */
            createNews: function(params) {
                Assert.isObject(params, 'Invalid "params" type');
                Assert.isString(params.title, 'Invalid "params.title" type');
                Assert.isString(params.body, 'Invalid "params.body" type');
                Assert.isString(params.image_url, 'Invalid "params.image_url" type');

                return $http.post(API_URL + 'news', params);
            }
        };
    }
})();