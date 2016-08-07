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
            deleteUsers: deleteUsers,
            banUsers: banUsers,
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

        function deleteUsers(params) {
            return $http.post(API_URL + 'users/deleted', params);
        }

        function banUsers(params) {
            return $http.post(API_URL + 'users/banned', params);
        }

        function changeRole() {
            return $http.post(API_URL);
        }
    }
})();