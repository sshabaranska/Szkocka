;(function() {
    'use strict';

    angular
        .module('news')
        .controller('NewsController', NewsController);

    /* ngInject */
    function NewsController($scope, newsService, userService, Upload,
    LOAD_LIMIT, API_URL, Assert, Type) {
        /** @public {Boolean} */
        $scope.showAddButton = userService.isAdmin();

        /** @public {Array<Object>} */
        $scope.news = [];

        /** @private {String} */
        $scope.cursor = null;

        /** @public {Object} */
        $scope.newsToAdd = {};

        /** @public {Boolean} */
        $scope.showMore = true;

        /** @public {Boolean} */
        $scope.addNewsSection = false;

        /** @private {Boolean} */
        $scope.loadMoreAvailable = true;

        /** @public {String} */
        $scope.errorMsg = null;

        /**
         * @public
         */
        $scope.loadMore = function() {
            if($scope.loadMoreAvailable) {
                $scope._init();
            }
        };

        /**
         * @public
         */
        $scope._init = function() {

            $scope.errorMsg = null;

            newsService.getNews($scope.cursor)
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
        $scope.showMore = function(el) {
            Assert.isObject(el, 'Invalid "el" type');
            el.showMore = false;
        };

        /**
         * @public
         * @param {Object} el
         */
        $scope.showLess = function(el) {
            Assert.isObject(el, 'Invalid "el" type');
            el.showMore = true;
        };

        /**
         * @public
         */
        $scope.addNews = function() {
            $scope.showAddButton = false;
            $scope.addNewsSection = true;
        };

        /**
         * @public
         */
        $scope.save = function() {

            if (Type.isUndefined($scope.newsToAdd.title) || $scope.newsToAdd.title == '' ||
                Type.isUndefined($scope.newsToAdd.body) || $scope.newsToAdd.body == '') {
                $scope.errorMsg = 'Required field';
                return;
            }

            NewsService.createNews($scope.newsToAdd)
                .then(function(res) {
                    $scope.showAddButton = true;
                    $scope.addNewsSection = false;
                    $scope.newsToAdd = {};
                    $scope.news = [];
                    $scope.cursor = null;
                    $scope.loadMoreAvailable = true;
                    $scope._init();
                }, function(err) {
                    $scope.errorMsg = 'Failed to create';
                });
        };

        /**
         * @public
         */
        $scope.cancel = function() {
            $scope.showAddButton = true;
            $scope.addNewsSection = false;
            $scope.errorMsg = null;
        };

        /**
         * @public
         * @param {Object} event
         */
        $scope.onFileSelect = function(event) {
            Assert.isObject(event, 'Invalid "event" type');

            var image = event.target.files[0];
            
            if (image.type !== 'image/png' && image.type !== 'image/jpeg') {
                alert('Only PNG and JPEG are accepted.');
                return;
            }

            $scope.upload = Upload.upload({
                url: API_URL + 'upload',
                method: 'POST',
                file: image
            }).success(function(data, status, headers, config) {
                $scope.newsToAdd.image_url = data.url;
            }).error(function(err) {
                console.log('Error uploading file: ' + err.message || err);
            });
        };

        /**
         * @public
         * @param {Object} el
         * @return {String}
         */
        $scope.detectClass = function(el) {
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