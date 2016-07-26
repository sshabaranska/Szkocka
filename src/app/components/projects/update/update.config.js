;(function() {
    'use strict';

    angular
        .module('update')
        .config(config);

    /* ngInject */
    function config($stateProvider) {
        $stateProvider.state('update', {
            url: '^/update',
            parent: 'restricted-area',
            views: {
                content: {
                    templateUrl: 'components/projects/update/update.html',
                    controller: 'UpdateController'
                }
            }
        });
    }
})();