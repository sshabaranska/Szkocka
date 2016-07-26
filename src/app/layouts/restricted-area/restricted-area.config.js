;(function() {
    'use strict';

    angular
        .module('restricted-area')
        .config(config);

    /* ngInject */
    function config($stateProvider) {
        $stateProvider.state('restricted-area', {
            abstract: true,
            resolve: {
                authService: 'authService',
                authResolver: authResolver
            },
            views: {
                content: {
                    templateUrl: 'layouts/restricted-area/restricted-area.html'
                }
            }
        });
    }

    /* ngInject */
    function authResolver(authService) {
        console.log(authService.isAuth());
        return authService.isAuth();
    }
})();