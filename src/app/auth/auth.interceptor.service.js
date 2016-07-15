;(function() {
    angular
        .module('auth')
        .factory('authInterceptorService', authInterceptorService);

    /* ngInject */
    function authInterceptorService($q, $timeout, $rootScope) {
        return {
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