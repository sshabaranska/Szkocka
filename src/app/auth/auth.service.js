;(function() {
    angular
        .module('auth')
        .factory('authService', authService);

    /* ngInject */
    function authService($q) {
        var activeToken = false;

        return {
            auth: auth,
            unAuth: unAuth,
            isAuth: isAuth
        };

        function auth(data) {
            activeToken = data.token;
            console.log(activeToken);
            //TODO: Store token to localStorage or cookies...
        }

        function unAuth() {
            activeToken = false;
            //TODO: Remove token from localStorage or cookies...
        }

        function isAuth() {
            return !!activeToken;
        }
    }
})();