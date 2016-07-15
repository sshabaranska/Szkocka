;(function() {
    'use strict';

    angular
        .module('app')
        .constant('APP_SETTINGS', {
            'API_URL': 'https://szkocka-1080.appspot.com/',
            'LOAD_LIMIT': '20',
            'TAGS_SHORT_LIST_QTY': '15',
            'CAROUSEL_INTERVAL': '5000',
            'APP_VERSION': '1.0'
        });
})();