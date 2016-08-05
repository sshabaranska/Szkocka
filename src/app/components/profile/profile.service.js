;(function() {
    'use strict';

    angular
        .module('profile')
        .factory('profileService', profileService);

    /* ngInject */
    function profileService($http, API_URL, Assert) {
        return {
            getUserProfile: getUserProfile,
            saveUsersProfileData: saveUsersProfileData,
            getInvitations: getInvitations,
            acceptInvitation: acceptInvitation,
            declineInvitation: declineInvitation
        };

        function getUserProfile(id) {
            Assert.isString(id, 'Invalid "id" type');
            return $http.get(API_URL + 'users/' + id);
        }

        function saveUsersProfileData(params) {
            Assert.isObject(params, 'Invalid "params" type');
            return $http.post(API_URL + 'users', params);
        }

        function getInvitations() {
            return $http.get(API_URL + 'users/me/invites/researches');
        }

        function acceptInvitation(id) {
            Assert.isString(id, 'Invalid "id" type');
            return $http.post(API_URL + 'users/me/invites/researches/' + id + '/accepted', {});
        }

        function declineInvitation(id) {
            Assert.isString(id, 'Invalid "id" type');
            return $http.post(API_URL + 'users/me/invites/researches/' + id + '/declined', {});
        }
    }
})();