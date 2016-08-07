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
            switch($scope.params.selectedAction) {
                case '1':
                    console.log('Delete user');
                    break;
                case '2':
                    console.log('Ban user');
                    break;
                default:
                    return;
            }
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