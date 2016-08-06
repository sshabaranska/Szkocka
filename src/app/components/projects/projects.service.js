;(function() {
    'use strict';

    angular
        .module('projects')
        .factory('projectsService', projectsService);

    /* ngInject */
    function projectsService($http, API_URL, Assert, Type) {
        return {
            getTags: getTags,
            query: query,
            getProjectById: getProjectById,
            update: update,
            sendInvitation: sendInvitation,
            removeResearcher: removeResearcher,
            getJoinRequests: getJoinRequests,
            joinResearch: joinResearch,
            aproveResearcher: aproveResearcher,
            rejectResearcher: rejectResearcher,
            getUserProfile: getUserProfile
        };

        function getTags() {
            return $http.get(API_URL + 'researches/tags');
        };

        /**
         * @public
         * @param {Object} params
         */
        function query(params) {
            Assert.isObject(params, 'Invalid "params" type');

            var _createQuery = function(data) {
                var params = [];

                if (!Type.isNull(data.keyword) && data.keyword != '') {
                    var keyword = 'keyword=' + data.keyword;
                    params.push(keyword);
                }

                if (!Type.isNull(data.status)) {
                    var status = 'status=' + data.status;
                    params.push(status);
                }

                if (!Type.isNull(data.tag)) {
                    var tag = 'tag=' + data.tag;
                    params.push(tag);
                }

                if (data.page != '') {
                    var page = 'page=' + data.page;
                    params.push(page);
                }
                return params.join('&');
            };
            return $http.get(API_URL + 'queries/researches?' + _createQuery(params));
        };

        /**
         * @public
         * @param {String} id
         */
        function getProjectById(id) {
            return $http.get(API_URL + 'researches/' + id);
        };

        /**
         * @public
         * @param {Object} params
         */
        function update(params) {
            Assert.isObject(params, 'Invalid "params" type');
            return $http.put(API_URL + 'researches/' + params.researchId, params);
        };

        /**
         * @public
         * @param {Object} params
         */
        function sendInvitation(params) {
            Assert.isObject(params, 'Invalid "params" type');
            return $http.post(API_URL + 'researches/' + params.researchId + '/invites', params);
        };

        /**
         * @public
         * @param {Object} params
         */
        function removeResearcher(params) {
            Assert.isObject(params, 'Invalid "params" type');
            return $http.delete(API_URL + 'researches/' + params.researchId + '/researchers/' + params.researcherId);
        };

        /**
         * @public
         * @param {String} id
         */
        function getJoinRequests(id) {
            return $http.get(API_URL + 'researches/' + id + '/requests');
        };

        /**
         * @public
         * @param {Object} params
         */
        function joinResearch(params) {
            Assert.isObject(params, 'Invalid "params" type');
            return $http.post(API_URL + 'researches/' + params.id + '/requests', params);
        };

        /**
         * @public
         * @param {Object} params
         */
        function aproveResearcher(params) {
            Assert.isObject(params, 'Invalid "params" type');
            return $http.post(API_URL + 'researches/' + params.researchId + '/researchers/' + params.userId + '/approved', {});
        };

        /**
         * @public
         * @param {Object} params
         */
        function rejectResearcher(params) {
            Assert.isObject(params, 'Invalid "params" type');
            return $http.post(API_URL + 'researches/' + params.researchId + '/researchers/' + params.userId + '/rejected', {});
        };

        /**
         * @public
         * @param {String} id
         */
        function getUserProfile(id) {
            return $http.get(API_URL + 'users/' + id);
        };
        
    }
})();