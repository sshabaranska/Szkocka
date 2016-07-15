;(function() {
    angular
        .module('auth')
        .factory('authInterceptorService', authInterceptorService);

    /* ngInject */
    function authInterceptorService($rootScope, $q, $cookieStore, $location, CacheStore, Type) {
        return {
            // Add authorization token to headers
            request: function (config) {
                config.headers = config.headers || {};

                if (config.url && config.url.indexOf('http') !== -1 && $cookieStore.get('token')) {
                    config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
                }
                if (Type.isUndefined($cookieStore.get('token'))) {
                    CacheStore.removeItem('userInfo');
                }
                return config;
            },

            // Intercept 401s and redirect you to login
            responseError: function(response) {
                if(response.status === 401) {
                    $location.path('/login');
                    // remove any stale tokens
                    $cookieStore.remove('token');
                    CacheStore.clear();
                    return $q.reject(response);
                } else {
                    return $q.reject(response);
                }
            }
        };
    };
})();