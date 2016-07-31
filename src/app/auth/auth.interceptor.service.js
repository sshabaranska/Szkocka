;(function() {
    angular
        .module('auth')
        .factory('authInterceptorService', authInterceptorService);

    /* ngInject */
    function authInterceptorService($q, $timeout, $rootScope, $cookies) {
        return {
            // Add authorization token to headers
            request: function (config) {
                config.headers = config.headers || {};

                if (config.url && config.url.indexOf('http') !== -1 && $cookies.get('token')) {
                    config.headers.Authorization = 'Bearer ' + $cookies.get('token');
                }
                return config;
            },
            // Intercept 401s and redirect you to login
            responseError: function(response) {
                if (response.status === 401) {
                    $timeout(function() {
                        $rootScope.signOut();
                    });
                }
                return $q.reject(response);
            }
        }
    }
})();