;(function() {
    'use strict';

    angular
        .module('sign-up')
        .config(config);

    /* ngInject */
    function config($stateProvider) {
        $stateProvider.state({
            url: 'sign-up',
            templateUrl: 'components/account/sign-up/sign-up.html',
            controller: 'SignUpController'
        });
    }
})();