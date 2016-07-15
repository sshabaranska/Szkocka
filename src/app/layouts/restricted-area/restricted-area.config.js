;(function() {
    'use strict';

    angular
        .module('restricted-area')
        .config(config);

    /* ngInject */
    function config($stateProvider) {
        $stateProvider.state('restricted-area', {
            abstract: true,
            views: {
                content: {
                    templateUrl: 'layouts/restricted-area/restricted-area.html'
                }
            }
        });
    }
})();