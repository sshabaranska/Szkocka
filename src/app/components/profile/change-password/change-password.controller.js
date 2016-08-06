;(function() {
    'use strict';

    angular
        .module('change-password')
        .controller('ChangePasswordController', ChangePasswordController);

    /* ngInject */
    function ChangePasswordController($scope, profileService) {
        /** @private {Object} */
        $scope.data = {};
        /** @private {String} */
        $scope.errorMsg = null;
        /** @private {String} */
        $scope.message = null;

        $scope.changePassword = changePassword;

        /**
         * @public
         * @param {Object} form
         */
        function changePassword(valid) {
            if(!valid) {
                return;
            }
            profileService.changePassword($scope.data)
                .then(function(res) {
                    $scope.message = 'Password successfully changed.';
                }, function(err) {
                    $scope.message = null;
                    $scope.errorMsg = 'Incorrect password';
                });
        };
    }
})();