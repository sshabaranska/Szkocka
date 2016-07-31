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
         * @param {Boolean} valid
         */
        $scope.signIn = function (valid, event) {
            Assert.isObject(event, 'Invalid "event" type');

            event.preventDefault();

            if (!valid) {
                $scope.error = 'Form is not valid';
                return;
            }

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