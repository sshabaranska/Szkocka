;(function() {
    angular
        .module('auth')
        .factory('authService', authService);

    /* ngInject */
    function authService($cookies, userService, CacheStore, Assert) {

        var isAuthorized = false;

        return {
            /**
             * public
             * param {String} token
             * param {Function} callback
             */
            auth: function (token, callback) {
                Assert.isString(token, 'Invalid "token" type');
                Assert.isFunction(callback, 'Invalid "callback" type');

                isAuthorized = true;
                $cookies.put('token', token);
                userService.init(token)
                    .then(function(res){
                        callback(null, res);
                    }, function(err) {
                        callback(err, null);
                    });
            },

            /**
             * public
             */
            unAuth: function() {
                isAuthorized = false;
                $cookies.remove('token');
                CacheStore.clear();
            },

            /**
             * public
             * return {Boolean}
             */
            isAuth: function() {
                return isAuthorized;
            }
        };
    }
})();