module.exports = function() {
    return {
        sources: {
            index: 'src/index.html',
            scripts: [
                'src/app/**/*.js',
                'src/assets/lib/**/*.js'
            ],
            stylesheets: [
                'node_modules/ng-tags-input/build/ng-tags-input.min.css',
                'src/assets/**/*.css',
                'src/app/**/*.less'
            ],
            images: 'src/assets/images/**/*',
            fonts: 'src/assets/fonts/**/*',
            templates: 'src/app/**/*.html',
            vendors: [
                'node_modules/angular/angular.min.js',
                'node_modules/angular-bootstrap/ui-bootstrap-tpls.min.js',
                'node_modules/angular-cookies/angular-cookies.min.js',
                'node_modules/angular-moment/angular-moment.min.js',
                'node_modules/angular-resource/angular-resource.min.js',
                'node_modules/angular-sanitize/angular-sanitize.min.js',
                'node_modules/angular-ui-router/release/angular-ui-router.min.js',
                'node_modules/jquery/dist/jquery.min.js',
                'node_modules/lodash/lodash.min.js',
                'node_modules/ng-file-upload/dist/ng-file-upload.min.js',
                'node_modules/ng-tags-input/build/ng-tags-input.min.js'
            ]
        },
        dev: {
            index: 'dev',
            scripts: 'dev/app',
            stylesheets: 'dev/stylesheets',
            images: 'dev/images',
            fonts: 'dev/fonts',
            templates: 'dev/app',
            vendors: 'dev/vendor'
        },
        release: {
            index: 'release',
            scripts: 'release/js',
            stylesheets: 'release/css',
            images: 'release/img',
            fonts: 'release/fonts',
            templates: 'release/layout',
            vendors: 'release/vendor'
        }
    };
};