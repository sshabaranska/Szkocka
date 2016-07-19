;(function() {
    'use strict';

    angular
        .module('sign-up')
        .factory('signUpService', signUpService);

    /* ngInject */
    function signUpService($http, API_URL) {
        return {
            signUp: signUp
        };

        function signUp(data) {
            //TODO: Set sign-up uri
            return $http.post(API_URL + 'users', data);
        }
    }
})();