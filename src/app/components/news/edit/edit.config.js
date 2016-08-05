;(function() {
    'use strict';

    angular
        .module('news.edit')
        .config(config);

    /* ngInject */
    function config($stateProvider) {
        $stateProvider.state('news-edit', {
            url: '^/news-edit',
            parent: 'restricted-area',
            views: {
                content: {
                    templateUrl: 'components/news/edit/edit.html',
                    controller: 'NewsEditController'
                }
            }
        });
    }
})();