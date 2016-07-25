angular
    .module('app', [
        //inject here angular modules
        'ui.router',

        'mock',

        'auth',
        'layouts',
        'shared',

        //inject here your components

        'about',
        'account',
        'home',
        'news',
        'projects',

        'templates'
    ]);