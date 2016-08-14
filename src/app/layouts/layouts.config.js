;(function() {
    'use strict';

    angular
        .module('layouts')
        .config(config);

    /* ngInject */
    function config($stateProvider) {
        $stateProvider.state('layouts', {
            abstract: true,
            resolve: {
                layoutsResolver: layoutsResolver
            },
            views: {
                content: {
                    templateUrl: 'layouts/layouts.html'
                }
            }
        });
    }

    /* ngInject */
    function layoutsResolver(authService, accountService) {
        if (authService.isAuth()) {
            return accountService.get();
        } else {
            return;
        }
    }
})();