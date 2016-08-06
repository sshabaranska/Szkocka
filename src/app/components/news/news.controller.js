;(function() {
    'use strict';

    angular
        .module('news')
        .controller('NewsController', NewsController);

    /* ngInject */
    function NewsController($scope, $state, newsService, accountService, LOAD_LIMIT, Assert, Type) {
        /** @public {Boolean} */
        $scope.showAddButton = accountService.isAdmin();
        /** @public {Array<Object>} */
        $scope.news = [];
        /** @private {String} */
        $scope.cursor = null;
        /** @public {Boolean} */
        $scope.showMore = true;
        /** @private {Boolean} */
        $scope.loadMoreAvailable = true;
        /** @public {String} */
        $scope.errorMsg = null;

        $scope._init = _init;
        $scope.loadMore = loadMore;
        $scope.showMore = showMore;
        $scope.showLess = showLess;
        $scope.addNews = addNews;
        $scope.detectClass = detectClass;

        /**
         * @public
         */
       function loadMore() {
            if($scope.loadMoreAvailable) {
                $scope._init();
            }
        };

        /**
         * @public
         */
        function _init() {
            $scope.errorMsg = null;
            newsService.get($scope.cursor)
                .then(function(res){
                    if ($scope.cursor === res.data.cursor) {
                        return;
                    }
                    if (res.data.news.length < LOAD_LIMIT) {
                        $scope.loadMoreAvailable = false;
                    }
                    $scope.cursor = res.data.cursor;

                    res.data.news.forEach(function(el) {
                        // create view object
                        var tmpObj = {};
                        tmpObj.viewNews = el;
                        tmpObj.showMore = true;

                        $scope.news.push(tmpObj);
                    });
                }, function(err) {
                    $scope.errorMsg = 'Error: Page was not loaded';
                    $scope.loadMoreAvailable = false;
                });

        };

        /**
         * @public
         * @param {Object} el
         */
        function showMore(el) {
            Assert.isObject(el, 'Invalid "el" type');
            el.showMore = false;
        };

        /**
         * @public
         * @param {Object} el
         */
        function showLess(el) {
            Assert.isObject(el, 'Invalid "el" type');
            el.showMore = true;
        };

        /**
         * @public
         */
        function addNews() {
            $state.go('news-edit');
        };

        /**
         * @public
         * @param {Object} el
         * @return {String}
         */
        function detectClass(el) {
            Assert.isObject(el, 'Invalid "el" type');
            if(el.showMore) {
                return 'short-decsr';
            } else {
                return 'long-decsr';
            }
        };

        $scope._init();
    }
})();