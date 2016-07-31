;(function() {
    angular
        .module('auth')
        .factory('authService', authService);

    /* ngInject */
    function authService($cookies, CacheStore, Assert) {

        var isAuthorized = false;

        return {
            /**
             * public
             * param {String} token
             */
            auth: function (token) {
                Assert.isString(token, 'Invalid "token" type');

                isAuthorized = true;
                $cookies.put('token', token);
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