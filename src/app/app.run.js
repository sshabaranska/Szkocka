;(function() {
    'use strict';

    angular
        .module('app')
        .run(run);

    /* ngInject */
    function run($rootScope, $state, authService) {
        $rootScope.signOut = signOut;

        function signOut() {
            authService.unAuth();
            $state.go('sign-in');
        }
    }
})();
