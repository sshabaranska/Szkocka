;(function() {
    'use strict';

    angular
        .module('sign-up')
        .controller('SignUpController', SignUpController);

    /* ngInject */
    function SignUpController($scope, $state, signUpService, Type, Assert) {
        /** @public {Object} */
        $scope.user = {};
        /** @public {Object} */
        $scope.errors = {};

        /**
         * @public
         * @param {Object} event
         */
        $scope.signUp = function (event) {
            Assert.isObject(event, 'Invalid "event" type');

            event.preventDefault();

            signUpService.signUp($scope.user, function(err, res) {
                if (Type.isObject(err)) {
                    $scope.errors.other = err.message;
                    console.log(err.message);
                    return;
                } else {
                    $state.go('home');
                }
            });
        }
    }
})();