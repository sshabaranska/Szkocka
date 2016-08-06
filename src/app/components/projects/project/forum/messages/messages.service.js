;(function() {
    'use strict';

    angular
        .module('project.messages')
        .factory('messagesService', messagesService);

    /* ngInject */
    function messagesService($http, API_URL, Assert, Type) {
    	return {
    		getForumById: getForumById,
    		getForumMessages: getForumMessages,
    		createNewMessage: createNewMessage
    	}

    	/**
         * @public
         * @param {String} id
         */
        function getForumById(id) {
            return $http.get(API_URL + 'forums/' + id);
        };

        /**
         * @public
         * @param {Object} params
         */
        function getForumMessages(params) {
            Assert.isObject(params, 'Invalid "params" type');

            var query = '';

            if (Type.isNull(params.cursor)) {
                query = params.forumId + '/messages';
            } else {
            	query = params.forumId + '/messages?cursor=' + params.cursor;
            }
            return $http.get(API_URL + 'forums/' + query);
        };

        /**
         * @public
         * @param {Object} params
         */
        function createNewMessage(params) {
            Assert.isObject(params, 'Invalid "params" type');
            Assert.isString(params.message, 'Invalid "params.message" type');
            return $http.post(API_URL + 'forums/' + params.forumId + '/messages', params);
        }
    }
})();