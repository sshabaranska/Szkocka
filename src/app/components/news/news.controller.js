;(function() {
    'use strict';

    angular
        .module('news')
        .controller('NewsController', NewsController);

    /* ngInject */
    function NewsController($scope, NewsResolver) {
        //TODO: News page: show news from NewsResolver
    }
})();