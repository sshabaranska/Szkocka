;(function() {
    'use strict';

    angular
        .module('sign-in')
        .config(config);

    /* ngInject */
    function config($stateProvider) {
        $stateProvider.state({
            url: 'sign-in',
            templateUrl: 'components/account/sign-in/sign-in.html',
            controller: 'SignInController'
        });
    }
})();