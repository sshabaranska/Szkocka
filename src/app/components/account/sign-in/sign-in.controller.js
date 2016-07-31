;(function() {
    'use strict';

    angular
        .module('sign-in')
        .controller('SignInController', SignInController);

    /* ngInject */
    function SignInController($scope, $state, signInService, authService, Assert, Type) {
        /** @public {Object} */
        $scope.user = {};
        /** @public {String} */
        $scope.error = null;

        /**
         * @public
         * @param {Object} event
         */
        $scope.signIn = function (event) {
            Assert.isObject(event, 'Invalid "event" type');

            event.preventDefault();

            signInService.signIn($scope.user, function(err, res) {
                if (Type.isObject(err)) {
                    $scope.error = err.message;
                    console.log(err.message);
                    return;
                } else {
                    $state.go('home');
                }
            });
        };
    }
})();