;(function() {
    'use strict';

    angular
        .module('profile')
        .config(config);

    /* ngInject */
    function config($stateProvider) {
        $stateProvider.state('profile', {
            url: '^/profile',
            parent: 'restricted-area',
            resolve: {
                accountService: 'accountService',
                ProfileResolver: ProfileResolver
            },
            views: {
                content: {
                    templateUrl: 'components/profile/profile.html',
                    controller: 'ProfileController'
                }
            }
        });
    }

    /* ngInject */
    function ProfileResolver(accountService) {
        return accountService.getCurrentUser();
    }
})();