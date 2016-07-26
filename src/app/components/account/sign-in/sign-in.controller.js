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

            signInService.signIn($scope.user)
                .then(function(response) {
                    //TODO: Successful signing in...
                    authService.auth(response.data.token);
                    $state.go('home');
                }, function(response) {
                    console.log(response);
                    //TODO: Unsuccessful signing in...
                });
        }
    }
})();