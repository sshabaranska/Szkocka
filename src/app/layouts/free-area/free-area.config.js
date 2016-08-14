;(function() {
    'use strict';

    angular
        .module('free-area')
        .config(config);

    /* ngInject */
    function config($stateProvider) {
        $stateProvider.state('free-area', {
            abstract: true,
            parent: 'layouts',
            views: {
                content: {
                    templateUrl: 'layouts/free-area/free-area.html',
                    controller: 'FreeAreaController'
                }
            }
        });
    }
})();