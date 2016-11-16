;(function() {
    'use strict';

    angular
        .module('app')
        .constant('APP_VERSION', '0.01')
        .constant('API_URL', 'https://szkocka-1080.appspot.com/')
        .constant('LOAD_LIMIT', 20)
        .constant('PROJ_STATUSES', [
            {'id': 'ACTIVE','name': 'ACTIVE'},
            {'id': 'CLOSED','name': 'CLOSED'},
            {'id': 'ONHOLD','name': 'ON HOLD'}])
        .constant('ACTIONS', [
            {'id': '1','name': 'Delete user'},
            {'id': '2','name': 'Ban user'}]);
})();