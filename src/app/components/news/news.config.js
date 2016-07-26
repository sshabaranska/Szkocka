;(function() {
    'use strict';

    angular
        .module('news')
        .config(config);

    /* ngInject */
    function config($stateProvider) {
        $stateProvider.state('news', {
            url: '^/news',
            parent: 'restricted-area',
            // resolve: {
            //     aboutService: 'newsService',
            //     News: NewsResolver
            // },
            templateUrl: 'components/news/news.html',
            controller: 'NewsController'
        });
    }

    /* ngInject */
    function NewsResolver(newsService) {
        return newsService.getContent();
    }
})();