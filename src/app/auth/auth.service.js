;(function() {
    angular
        .module('auth')
        .factory('authService', authService);

    /* ngInject */
    function authService($cookies) {
        var isAuthorized = false;

        return {
            auth: auth,
            unAuth: unAuth,
            isAuth: isAuth
        };

        function auth(token) {
            isAuthorized = true;
            $cookies.put('token', token);
        }

        function unAuth() {
            isAuthorized = false;
            $cookies.remove('token');
        }

        function isAuth() {
            return isAuthorized;
        }
    }
})();