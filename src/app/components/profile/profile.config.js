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
            views: {
                content: {
                    templateUrl: 'components/profile/profile.html'
                }
            }
        });
    }
})();