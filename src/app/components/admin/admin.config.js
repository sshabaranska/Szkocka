;(function() {
    'use strict';

    angular
        .module('admin')
        .config(config);

    /* ngInject */
    function config($stateProvider) {
        $stateProvider.state('admin', {
            url: '^/admin',
            parent: 'restricted-area',
            views: {
                content: {
                    templateUrl: 'components/admin/admin.html',
                    controller: 'AdminController'
                }
            }
        });
    }
})();