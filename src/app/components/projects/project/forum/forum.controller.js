;(function() {
    'use strict';

    angular
        .module('project.forum')
        .controller('ProjectForumController', ProjectForumController);

    /* ngInject */
    function ProjectForumController($scope, $state, $stateParams, LOAD_LIMIT, forumService, Assert) {
    	/** @private {String} */
        $scope.researchId = $stateParams.id;
        /** @public {Array<Object>} */
        $scope.forums = [];
        /** @public {Boolean} */
        $scope.forumsAccessError = true;
        /** @public {String} */
        $scope.cursor = null;
        /** @public {Boolean} */
        $scope.loadMoreAvailable = true;

        $scope._init = _init;
		$scope.loadMore = loadMore;
		$scope.createForum = createForum;

        /**
         * @private
         */
        function _init() {
            $scope.errorMsg = null;

            var params = {
                researchId: $scope.researchId,
                cursor: $scope.cursor
            };

            forumService.get(params)
            	.then(function(res) {
            		$scope.forumsAccessError = false;
                    if ($scope.cursor == res.data.cursor) {
                        return;
                    }
                    if (res.data.forums.length < LOAD_LIMIT) {
                        $scope.loadMoreAvailable = false;
                    }
                    $scope.cursor = res.data.cursor;

                    res.data.forums.forEach(function(forum) {
                        $scope.forums.push(forum);
                    });
            	}, function(err) {
            		$scope.loadMoreAvailable = false;
            		console.log(err.message);
            	});
        };

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
         * @param {String} topic
         */
        function createForum(topic){
            Assert.isString(topic, 'Invalid "topic" type');

            var params = {
                researchId: $scope.researchId,
                subject: topic
            };

            forumService.createNewForum(params)
            	.then(function(res) {
            		$state.go('project.forum.messages', {forumId: res.data.forum_id});
            	}, function(err) {
            		console.log(err.message);
            	});
        };
        $scope._init();
    }
})();