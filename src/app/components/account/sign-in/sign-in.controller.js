;(function() {
    'use strict';

    angular
        .module('sign-in')
        .controller('SignInController', SignInController);

    /* ngInject */
    function SignInController($scope, signInService, authService) {
        $scope.user = {
            email: '',
            password: ''
        };

        $scope.signIn = function(event) {
            event.preventDefault();

            signInService.signIn($scope.user).then(function(data) {
                //TODO: Successful signing in...
                //Only of data is token...
                authService.auth(data);
            }, function() {
                //TODO: Unsuccessful signing in...
            });
        }
    }
})();