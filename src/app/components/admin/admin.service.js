;(function() {
    'use strict';

    angular
        .module('admin')
        .factory('adminService', adminService);

    /* ngInject */
    function adminService($http, API_URL, Assert, Type) {
    	return {
    		getUsers: getUsers,
            queryUsers: queryUsers,
            deleteUser: deleteUser,
            banUser: banUser,
            changeRole: changeRole
    	}

        /**
         * @public
         * @param {String} cursor
         */
        function getUsers(cursor) {
            Assert.isString(cursor, 'Invalid "cursor" type');
            var query = '';

            if (Type.isString(cursor)) {
                query = '?cursor=' + cursor;
            }
            return $http.get(API_URL + 'users' + query);
        }

        /**
         * @public
         * @param {Object} params
         */
        function queryUsers(params) {
            Assert.isObject(params, 'Invalid "params" type');
            return $http.get(API_URL);
        }

        function deleteUser() {
            return $http.post(API_URL);
        }

        function banUser() {
            return $http.post(API_URL);
        }

        function changeRole() {
            return $http.post(API_URL);
        }
    }
})();