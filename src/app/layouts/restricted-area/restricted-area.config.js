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
                $q: '$q',
                $timeout: '$timeout',
                $state: '$state',
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
    function authResolver($q, $timeout, $state, authService) {
        //TODO: Should be refactored... It must be much simpler...
        var deferred = $q.defer();

        if (authService.isAuth()) {
            deferred.resolve();
        } else {
            $timeout(function() {
                $state.go('sign-in');
            });
            deferred.reject();
        }

        return deferred.promise;
    }
})();