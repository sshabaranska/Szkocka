;(function() {
    'use strict';

    angular
        .module('navigation-bar')
        .controller('NavigationBarController', NavigationBarController);

    /* ngInject */
    function NavigationBarController($scope, $rootScope) {
        $scope.signOut = $rootScope.signOut;
        console.log($scope.showAuth);
    }
})();