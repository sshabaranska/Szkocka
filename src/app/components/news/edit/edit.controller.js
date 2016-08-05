;(function() {
    'use strict';

    angular
        .module('news-edit')
        .controller('NewsEditController', NewsEditController);

    /* ngInject */
    function NewsEditController($scope, $state, newsService, Upload, API_URL, Assert, Type) {
        /** @public {Object} */
        $scope.newsToAdd = {};
        /** @public {String} */
        $scope.errorMsg = null;

        /**
         * @public
         */
        $scope.save = function() {
            if (Type.isUndefined($scope.newsToAdd.title) || $scope.newsToAdd.title == '' ||
                Type.isUndefined($scope.newsToAdd.body) || $scope.newsToAdd.body == '') {
                $scope.errorMsg = 'Required field';
                return;
            }

            newsService.create($scope.newsToAdd)
                .then(function(res) {
                    $state.go('news');
                }, function(err) {
                    $scope.errorMsg = 'Failed to create';
                });
        };

        /**
         * @public
         */
        $scope.cancel = function() {
            $state.go('news');
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
    }
})();