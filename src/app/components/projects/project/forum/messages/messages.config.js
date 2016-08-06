;(function() {
    'use strict';

    angular
        .module('project.forum.messages')
        .config(config);

    /* ngInject */
    function config($stateProvider) {
        $stateProvider.state('project.forum.messages', {
            url: '/:forumId',
            parent: 'project.forum',
            views: {
                content: {
                    templateUrl: 'components/projects/project/forum/messages/messages.html',
                    controller: 'ForumMessagesController'
                }
            }
        });
    }
})();