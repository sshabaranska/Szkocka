;(function() {
    'use strict';

    angular
        .module('profile.edit')
        .controller('ProfileEditController', ProfileEditController);

    /* ngInject */
    function ProfileEditController($scope, $state, profileService, Type, userProfileResolver) {
        /** @public {Object} */
        $scope.user = userProfileResolver.data;

        $scope.save = save;

        function save() {
            profileService.saveUsersProfileData($scope.user)
                .then(function(res) {
                    $state.go('profile', {id: 'null'});
                }, function(err) {
                    console.log(err.message);
                });
        };
    }
})();