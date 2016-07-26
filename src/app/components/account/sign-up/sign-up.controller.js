;(function() {
    'use strict';

    angular
        .module('sign-up')
        .controller('SignUpController', SignUpController);

    /* ngInject */
    function SignUpController($scope, $state, signUpService, authService) {
        $scope.user = {};
        $scope.signUp = signUp;

        function signUp(event) {
            event.preventDefault();


            console.log($scope.user);
            signUpService.signUp($scope.user)
                .then(function(response) {
                    //TODO: Successful signing up...
                    authService.auth(response.data.token);
                    $state.go('home');
                }, function(response) {
                    console.log(response);
                    //TODO: Unsuccessful signing up...
                });
        }
    }
})();