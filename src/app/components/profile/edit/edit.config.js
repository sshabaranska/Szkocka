;(function() {
    'use strict';

    angular
        .module('profile.edit')
        .config(config);

    /* ngInject */
    function config($stateProvider) {
        $stateProvider.state('profile-edit', {
            url: '^/profile-edit',
            parent: 'restricted-area',
            views: {
                content: {
                    templateUrl: 'components/profile/edit/edit.html',
                    controller: 'ProfileEditController'
                }
            }
        });
    }
})();