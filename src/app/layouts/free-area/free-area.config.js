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
                $q: '$q',
                $timeout: '$timeout',
                $state: '$state',
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
    function authResolver($q, $timeout, $state, authService) {
        //TODO: Should be refactored... It must be much simpler...
        var deferred = $q.defer();

        if (authService.isAuth()) {
            $timeout(function() {
                $state.go('home');
            });
            deferred.reject();
        } else {
            deferred.resolve();
        }

        return deferred.promise;
    }
})();