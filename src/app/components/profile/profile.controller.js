;(function() {
    'use strict';

    angular
        .module('profile')
        .controller('ProfileController', ProfileController);

    /* ngInject */
    function ProfileController($scope, $state, $stateParams, profileService,
        ProfileResolver, Assert, Type) {
        /** @public {Object} */
        $scope.isMyProfile = Type.isUndefined($stateParams.id);
        /** @private {String} */
        $scope.userId = $stateParams.id || ProfileResolver._id;
        /** @public {Object} */
        $scope.user = {};
        /** @public {Array<String>} */
        $scope.area = [];
        /** @public {Array<Object>} */
        $scope.invitations = [];
        /** @public {String} */
        $scope.errorMsg = null;

        /**
         * @private
         */
        $scope._init = function() {
            $scope.getUserProfile();

            if ($scope.isMyProfile) {
                $scope.getInvitations();
            }
        };

        /**
         * @public
         */
        $scope.getUserProfile = function() {
            profileService.getUserProfile($scope.userId)
                .then(function(res) {
                        $scope.user = res.data;
                        if (!_.isEmpty($scope.user.supervisor_of)){
                            var area = []; 
                            $scope.user.supervisor_of.forEach(function(proj) {
                                area.push(proj.area);
                            });
                            $scope.area = _.uniq(area)
                        }
                    }, function(err) {
                        $scope.errorMsg = 'User was not found';
                    });
        };

        /**
         * @public
         */
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

        /**
         * @public
         */
        $scope.edit = function() {
            $state.go('edit-profile', {id: $scope.userId});
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