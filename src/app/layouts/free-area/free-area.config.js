;(function() {
    'use strict';

    angular
        .module('free-area')
        .config(config);

    /* ngInject */
    function config($stateProvider) {
        $stateProvider.state('free-area', {
            abstract: true,
            resolve: {
                authService: 'authService',
                authResolver: authResolver
            },
            views: {
                content: {
                    templateUrl: 'layouts/free-area/free-area.html'
                }
            }
        });
    }

    /* ngInject */
    function authResolver(authService) {
        return !authService.isAuth();
    }
})();