;(function() {
    'use strict';

    angular
        .module('free-area')
        .config(config);

    /* ngInject */
    function config($stateProvider) {
        $stateProvider.state({
            abstract: true,
            views: {
                content: {
                    templateUrl: 'layouts/free-area/free-area.html'
                }
            }
        });
    }
})();