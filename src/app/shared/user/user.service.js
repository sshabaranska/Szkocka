;(function() {
    angular
        .module('user')
        .factory('userService', userService);

    /* ngInject */
    function userService($http, $q, API_URL, CacheStore, Type) {
        /** @private {String} */
        var userLabel = 'userInfo';
        /** @private {Object} */
        var currentUser = {};

        return {
            /**
             * public
             * @param  {String}   token
             * @return {Promise}
             */
            init: function(token) {
                var deferred = $q.defer();
                if (Type.isString(token) && CacheStore.itemExist(userLabel)) {
                    currentUser = CacheStore.getItem(userLabel);
                    deferred.resolve();
                } else if (Type.isString(token) && !CacheStore.itemExist(userLabel)){
                    $http.get(API_URL + 'users/me')
                        .then(
                            function(response) {
                                currentUser = response.data.user;
                                CacheStore.cacheItem(userLabel, currentUser);
                                deferred.resolve(response);
                            },
                            function(err) {
                                console.log(err);
                                deferred.reject(err);
                            });
                }
                return deferred.promise;
            },

            /**
             * public
             * @return {Object} user
             */
            getCurrentUser: function() {
                return currentUser.user;
            },

            /**
             * public
             * @return {Boolean}
             */
            isAdmin: function() {
                return currentUser.role === 'admin';
            }
        };
    }
})();