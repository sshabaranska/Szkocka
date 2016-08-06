;(function() {
    'use strict';

    angular
        .module('profile')
        .controller('ProfileController', ProfileController);

    /* ngInject */
    function ProfileController($scope, $state, $stateParams, profileService,
        accountService, Assert, Type) {
        /** @public {Object} */
        $scope.isMyProfile = $stateParams.id === 'null';
        /** @private {String} */
        $scope.userId = $scope.isMyProfile ? accountService.getCurrentUser()._id : $stateParams.id;
        /** @public {Object} */
        $scope.user = {};
        /** @public {Array<Object>} */
        $scope.invitations = [];
        /** @public {String} */
        $scope.errorMsg = null;

        /** @private */
        $scope._init = function() {
            $scope.getUserProfile();

            if ($scope.isMyProfile) {
                $scope.getInvitations();
            }
        };

        /** @public */
        $scope.getUserProfile = function() {
            profileService.getUserProfile($scope.userId.toString())
                .then(function(res) {
                        $scope.user = res.data;
                    }, function(err) {
                        $scope.errorMsg = 'User was not found';
                    });
        };

        /** @public */
        $scope.getInvitations = function() {
            profileService.getInvitations()
                .then(function(res) {
                    if (!Type.isNull(res)) {
                        $scope.invitations = _.uniq(res.data.researches);
                    }
                }, function(err) {
                    console.log(err.message);
                });
        };

        /** @public */
        $scope.edit = function() {
            $state.go('profile-edit', {id: $scope.userId});
        };

        /**
         * @public
         * @param {Object} proj
         */
        $scope.accept = function(proj) {
            Assert.isObject(proj, 'Invalid "proj" type');

            profileService.acceptInvitation(proj.id.toString())
                .then(function(res) {
                    if (!Type.isNull(res)) {
                        $scope._init();
                    }
                }, function(err) {
                    console.log(err.message);
                });
        };

        /**
         * @public
         * @param {Object} proj
         */
        $scope.ignore = function(proj) {
            Assert.isObject(proj, 'Invalid "proj" type');

            profileService.declineInvitation(proj.id.toString())
                .then(function(res) {
                    if (!Type.isNull(res)) {
                        $scope._init();
                    }
                }, function(err) {
                    console.log(err.message);
                });
        };

        $scope._init();
    }
})();