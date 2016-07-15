;(function() {
    'use strict';

    angular
        .module('about')
        .config(config);

    /* ngInject */
    function config($stateProvider) {
        $stateProvider.state('about', {
            url: '^/about',
            resolve: {
                aboutService: 'aboutService',
                AboutContentResolver: AboutContentResolver
            },
            templateUrl: 'components/about/about.html',
            controller: 'AboutController'
        });
    }

    /* ngInject */
    function AboutContentResolver(aboutService) {
        return aboutService.getContent();
    }
})();