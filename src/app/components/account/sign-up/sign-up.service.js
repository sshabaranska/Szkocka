;(function() {
    'use strict';

    angular
        .module('sign-up')
        .factory('signUpService', signUpService);

    /* ngInject */
    function signUpService() {
        return {
            signUp: signUp
        };

        function signUp() {
            //TODO: Request to sign-up end-point...
        }
    }
})();