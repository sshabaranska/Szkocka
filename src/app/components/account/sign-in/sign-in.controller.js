;(function() {
    'use strict';

    angular
        .module('sign-in')
        .controller('SignInController', SignInController);

    /* ngInject */
    function SignInController($scope, signInService, authService) {
        $scope.data = {
            email: '',
            password: ''
        };

        $scope.signIn = signIn;

        function signIn(event) {
            event.preventDefault();

            signInService.signIn($scope.data).then(function(data) {
                //TODO: Successful signing in...
                //Only of data is token...
                authService.auth(data);
            }, function() {
                //TODO: Unsuccessful signing in...
            });
        }
    }
})();