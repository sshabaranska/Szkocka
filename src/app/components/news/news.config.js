;(function() {
    'use strict';

    angular
        .module('news')
        .config(config);

    /* ngInject */
    function config($stateProvider) {
        $stateProvider.state({
            url: 'news',
            resolve: {
                aboutService: 'newsService',
                News: NewsResolver
            },
            templateUrl: 'components/news/news.html',
            controller: 'NewsController'
        });
    }

    /* ngInject */
    function NewsResolver(newsService) {
        return newsService.getContent();
    }
})();