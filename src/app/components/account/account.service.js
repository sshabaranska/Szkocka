;(function() {
    'use strict';

    angular
        .module('account')
        .factory('accountService', accountService);

    /* ngInject */
    function accountService($http, API_URL) {
        return {
            get: get
        };

        function get() {
            return $http.get(API_URL + 'users/me');
        }
    }
})();