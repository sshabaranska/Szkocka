;(function() {
    'use strict';

    angular
        .module('sign-in')
        .controller('SignInController', SignInController);

    /* ngInject */
    function SignInController($scope, signInService, authService) {
        $scope.user = {};

        $scope.signIn = function(event) {
            event.preventDefault();

            signInService.signIn($scope.user).then(function(data) {
                //TODO: Successful signing in...
                authService.auth(data);
                $state.go('home');
            }, function() {
                console.log(data);
                //TODO: Unsuccessful signing in...
            });
        }
    }
})();