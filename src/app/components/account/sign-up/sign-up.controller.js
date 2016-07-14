;(function() {
    'use strict';

    angular
        .module('sign-up')
        .controller('SignUpController', SignUpController);

    /* ngInject */
    function SignUpController($scope, signUpService, authService) {
        $scope.signUp = signUp;

        function signUp(event) {
            event.preventDefault();

            signUpService.signUp().then(function(data) {
                //TODO: Successful signing up...
                //Only of data is token...
                authService.auth(data);
            }, function() {
                //TODO: Unsuccessful signing up...
            });
        }
    }
})();