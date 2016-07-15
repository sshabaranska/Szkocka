;(function() {
    'use strict';

    angular
        .module('app')
        .controller('AppController', AppController);

    /* ngInject */
    function AppController($scope, $rootScope, $state, authService) {

        $rootScope.signOut = signOut;


        function signOut() {
            authService.unAuth();
            $state.go('sign-in');
        }
    }
})();