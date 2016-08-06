;(function() {
    'use strict';

    angular
        .module('change-password')
        .controller('ChangePasswordController', ChangePasswordController);

    /* ngInject */
    function ChangePasswordController($scope, profileService, accountService) {
        /** @private {Object} */
        $scope.user = accountService.getCurrentUser();
        /** @private {Object} */
        $scope.data = {};
        /** @private {String} */
        $scope.errorMsg = null;
        /** @private {String} */
        $scope.message = null

        /**
         * @public
         * @param {Object} form
         */
        $scope.changePassword = function(valid) {
            if(!valid) {
                return;
            }
            profileService.changePassword($scope.user._id.toString(), $scope.data)
                .then(function(res) {
                    $scope.message = 'Password successfully changed.';
                }, function(err) {
                    $scope.message = null;
                    $scope.errorMsg = 'Incorrect password';
                });
        };
    }
})();