;(function() {
    'use strict';

    angular
        .module('about')
        .factory('aboutService', aboutService);

    /* ngInject */
    function aboutService($http) {
        return {
            getContent: getContent
        };

        function getContent() {
            //TODO: Insert real about end-point...
            return $http.get('where/is/about/end-point');
        }
    }
})();