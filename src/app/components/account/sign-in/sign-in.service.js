;(function() {
    'use strict';

    angular
        .module('sign-in')
        .factory('signInService', signInService);

    /* ngInject */
    function signInService($http, API_URL) {
        return {
            signIn: signIn
        };

        function signIn(data) {
            return $http.post(API_URL + 'auth/local', data);
        }
    }
})();