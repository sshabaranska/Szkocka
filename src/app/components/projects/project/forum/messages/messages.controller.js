;(function() {
    'use strict';

    angular
        .module('project.messages')
        .controller('ForumMessagesController', ForumMessagesController);

    /* ngInject */
    function ForumMessagesController($scope, $stateParams, LOAD_LIMIT, messagesService, Assert) {
    	/** @private {String} */
        $scope.forumId = $stateParams.forumId;
        /** @public {Object} */
        $scope.activeForum = {};
        /** @public {Array<Object>} */
        $scope.activeForumMessages = [];
        /** @public {String} */
        $scope.newMessage = null;
        /** @public {String} */
        $scope.cursor = null;
        /** @public {Boolean} */
        $scope.loadMoreAvailable = true;

        $scope._getActiveForum = _getActiveForum;
        $scope._init = _init;
        $scope.loadMore = loadMore;
        $scope.postMessage = postMessage;

        /**
         * @private
         */
        function _getActiveForum() {
        	messagesService.getForumById($scope.forumId)
        		.then(function(res) {
        			$scope.activeForum = res.data;
        		},function(err) {
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
         * @private
         */
        function _init() {
            var params = {
                cursor: $scope.cursor,
                forumId: $scope.forumId
            };

            messagesService.getForumMessages(params)
            	.then(function(res) {
            		if ($scope.cursor == res.data.cursor) {
                        return;
                    }
                    if (res.data.messages.length < LOAD_LIMIT) {
                        $scope.loadMoreAvailable = false;
                    }
                    $scope.cursor = res.data.cursor;

                    res.data.messages.forEach(function(msg) {
                        $scope.activeForumMessages.push(msg);
                    });
            	}, function(err) {
            		$scope.loadMoreAvailable = false;
            		console.log(err.message);
            	});
        };

        /**
         * @public
         * @param {String} text
         */
        function postMessage(text){
            Assert.isString(text, 'Invalid "text" type');

            var params = {
                forumId: $scope.forumId,
                message: text
            };

            messagesService.createNewMessage(params)
            	.then(function(res) {
            		var msg = {
                        message: text,
                        createdBy: {name:'You'},
                        created: new Date()
                    };
                    $scope.activeForumMessages.push(msg);
                    $scope.newMessage = '';
            	}, function(err) {
            		console.log(err.message);
            	});
        };

        $scope._init();
        $scope._getActiveForum();
    }
})();