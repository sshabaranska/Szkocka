;(function() {
    'use strict';

    angular
        .module('app')
        .run(run);

    /* ngInject */
    function run($rootScope, $state, $cookies, authService) {
        $rootScope.signOut = signOut;

        if ($cookies.get('token')) {
            authService.auth($cookies.get('token'));
        }

        function signOut() {
            authService.unAuth();
            $state.go('sign-in');
        }
    }
})();
