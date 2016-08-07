;(function() {
    'use strict';

    angular
        .module('admin.users')
        .controller('UsersController', UsersController);

    /* ngInject */
    function UsersController($scope, LOAD_LIMIT, ACTIONS, ROLES, adminService, Assert) {
    	/** @public {Array<Object>} */
        $scope.users = [];
        /** @private {Object} */
        $scope.params = {
          selectedAction: null,
          selectedRole: null,
          selectedUsers: []
        };
        /** @private {Object} */
        $scope.cursor = '';
        /** @private {String} */
        $scope.loadMoreAvailable = true;
        /** @public {Array<Object>} */
        $scope.actions = ACTIONS; 
        /** @public {Array<Object>} */
        $scope.roles = ROLES;

        $scope._init = _init;
        $scope._deleteUsers = _deleteUsers;
        $scope._banUsers = _banUsers;
        $scope.loadMore = loadMore;
        $scope.apply = apply;
        $scope.changeRole = changeRole;
        $scope.search = search;
        $scope.restore = restore;
        $scope.setChecked = setChecked;

        /**
         * @private
         */
        function _init() {
            adminService.getUsers($scope.cursor)
            	.then(function(res) {
            		if ($scope.cursor == res.data.cursor) {
	                    return;
	                }
	                if (res.data.users.length < LOAD_LIMIT) {
	                    $scope.loadMoreAvailable = false;
	                }
	                $scope.cursor = res.data.cursor;

	                res.data.users.forEach(function(user) {
	                    $scope.users.push(user);
	                });
            	}, function(err) {
            		$scope.loadMoreAvailable = false;
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
         */
        function apply() {
            if ($scope.params.selectedUsers.length > 0) {
                return;
            }
            switch($scope.params.selectedAction) {
                case '1':
                    $scope._deleteUsers();
                    break;
                case '2':
                    $scope._banUsers();
                    break;
                default:
                    return;
            }
        };

        function _deleteUsers() {
            adminService.deleteUsers({users_ids: $scope.params.selectedUsers})
                .then(function(res) {
                    $scope.users = [];
                    $scope.cursor = '';
                    $scope.loadMoreAvailable = true;
                    $scope.params.selectedUsers = [];
                    $scope._init();
                }, function(err) {
                    console.log(err);
                });
        };

        function _banUsers() {
            var params = {
                users_ids: $scope.params.selectedUsers,
                ban_forums: true,
                ban_messages: false
            }
            adminService.banUsers(params)
                .then(function(res) {
                    $scope.users = [];
                    $scope.cursor = '';
                    $scope.loadMoreAvailable = true;
                    $scope.params.selectedUsers = [];
                    $scope._init();
                }, function(err) {
                    console.log(err);
                });
        };

        /**
         * @public
         */
        function changeRole() {
            switch($scope.params.selectedRole) {
                case 'admin':
                    console.log('Admin');
                    break;
                case 'user':
                    console.log('User');
                    break;
                default:
                    return;
            }
        };

        /**
         * @public
         */
        function search() {
            console.log('Search');
        };

        /**
         * @public
         */
        function restore() {
            console.log('restore');
        };

        /**
        * @public
        * @param {Object} user
        */
        function setChecked(user) {
            Assert.isObject(user, 'Invalid "user" type');

            if (user.checked) {
                $scope.params.selectedUsers.push(user.id)
            } else {
                _.remove($scope.params.selectedUsers, function(userId) {
                    return userId == user.id;
                });
            }
        };

        $scope._init();
    }
})();