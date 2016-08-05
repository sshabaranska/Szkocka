;(function() {
    'use strict';

    angular
        .module('profile.edit')
        .controller('ProfileEditController', ProfileEditController);

    /* ngInject */
    function ProfileEditController($scope, $state, $stateParams, profileService, Type) {
    	/** @private {String} */
        $scope.userId = $stateParams.id;
        /** @public {Object} */
        $scope.user = {};

        /**
         * @private
         */
        $scope._init = function() {
            profileService.getUserProfile($scope.userId)
            	.then(function(res) {
            		if (!Type.isNull(res)) {
	                    $scope.user = res.data;
	                }
            	}, function(err) {
            		console.log(err.message);
            	});
        };

        /**
         * @public
         */
        $scope.save = function() {
            profileService.saveUsersProfileData($scope.user, function(err, res) {
                if (!Type.isNull(res)) {
                    $state.go('profile', {id: $scope.userId});
                }
            });
        };

        $scope._init();
    }
})();