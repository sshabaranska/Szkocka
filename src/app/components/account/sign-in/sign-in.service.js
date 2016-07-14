;(function() {
    'use strict';

    angular
        .module('sign-in')
        .factory('signInService', signInService);

    /* ngInject */
    function signInService() {
        return {
            signIn: signIn
        };

        function signIn() {
            //TODO: Request to sign-in end-point...
        }
    }
})();