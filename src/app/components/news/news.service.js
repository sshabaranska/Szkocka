;(function() {
    'use strict';

    angular
        .module('news')
        .factory('newsService', newsService);

    /* ngInject */
    function newsService($http) {
        return {
            getNews: getNews
        };

        function getNews() {
            //TODO: Insert real news end-point...
            return $http.get('where/is/news/end-point');
        }
    }
})();