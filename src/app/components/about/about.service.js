;(function() {
    'use strict';

    angular
        .module('about')
        .factory('aboutService', aboutService);

    /* ngInject */
    function aboutService($q, $http) {
        return {
            getContent: getContent
        };

        function getContent() {
            //TODO: Insert real about end-point...
            return $q.resolve('some about content');
            //return $http.get('where/is/about/end-point');
        }
    }
})();