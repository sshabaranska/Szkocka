;(function() {
    'use strict';

    angular
        .module('about')
        .config(config);

    /* ngInject */
    function config($stateProvider) {
        $stateProvider.state('about', {
            url: '^/about',
            parent: 'restricted-area',
            resolve: {
                aboutService: 'aboutService',
                AboutContentResolver: AboutContentResolver
            },
            views: {
                content: {
                    templateUrl: 'components/about/about.html',
                    controller: 'AboutController'
                }
            }
        });
    }

    /* ngInject */
    function AboutContentResolver(aboutService) {
        return aboutService.getContent();
    }
})();