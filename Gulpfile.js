var config = require('./gulp.config')();

var gulp = require('gulp'),
    angularFileSort = require('gulp-angular-filesort'),
    concat = require('gulp-concat'),
    inject = require('gulp-inject'),
    ngAnnotate = require('gulp-ng-annotate'),
    ngHtml2js = require('gulp-ng-html2js'),
    less = require('gulp-less'),
    del = require('del'),
    eventStream = require('event-stream');

gulp.task('clean-dev', cleanDev);
gulp.task('compile', compile);
gulp.task('dev', ['clean-dev'], compile);

gulp.task('clean-release', cleanRelease);
gulp.task('compile-release', compileRelease);
gulp.task('release', ['clean-release'], compileRelease);

gulp.task('default', ['dev']);

function cleanDev() {
    return del(config.dev.index);
}

function cleanRelease() {
    return del(config.release.index);
}

function compile() {
    return eventStream.merge(
        buildIndex(),
        buildImages(),
        buildFonts()
    );
}

function compileRelease() {
    return eventStream.merge(
        buildIndexRelease(),
        buildImagesRelease(),
        buildFontsRelease()
    );
}

function buildIndex() {
    return gulp.src(config.sources.index)
        .pipe(inject(buildScripts(), { relative: true }))
        .pipe(inject(buildTemplates(), { relative: true, name: 'templates' }))
        .pipe(inject(buildVendorScripts(), { relative: true, name: 'vendor' }))
        .pipe(inject(buildStyles(), { relative: true }))
        .pipe(gulp.dest(config.dev.index));
}

function buildIndexRelease() {
    return gulp.src(config.sources.index)
        .pipe(inject(buildVendorScriptsRelease(), { relative: true, name: 'vendor' }))
        .pipe(inject(buildScriptsRelease(), { relative: true }))
        .pipe(inject(buildTemplatesRelease(), { relative: true, name: 'templates' }))
        .pipe(inject(buildStylesRelease(), { relative: true }))
        .pipe(gulp.dest(config.release.index));
}

function buildImages() {
    return gulp.src(config.sources.images)
        .pipe(gulp.dest(config.dev.images));
}

function buildImagesRelease() {
    return gulp.src(config.sources.images)
        .pipe(gulp.dest(config.release.images));
}

function buildFonts() {
    return gulp.src(config.sources.fonts)
        .pipe(gulp.dest(config.dev.fonts));
}

function buildFontsRelease() {
    return gulp.src(config.sources.fonts)
        .pipe(gulp.dest(config.release.fonts));
}

function buildScripts() {
    return gulp.src(config.sources.scripts)
        .pipe(angularFileSort())
        .pipe(ngAnnotate())
        .pipe(gulp.dest(config.dev.scripts));
}

function buildScriptsRelease() {
    return gulp.src(config.sources.scripts)
        .pipe(angularFileSort())
        .pipe(ngAnnotate())
        .pipe(concat('build.js'))
        .pipe(gulp.dest(config.release.scripts));
}

function buildTemplates() {
    return gulp.src(config.sources.templates)
        .pipe(ngHtml2js({moduleName: 'templates'}))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest(config.dev.templates));
}

function buildTemplatesRelease() {
    return gulp.src(config.sources.templates)
        .pipe(ngHtml2js({moduleName: 'templates'}))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest(config.release.templates));
}

function buildVendorScripts() {
    return gulp.src(config.sources.vendor)
        .pipe(gulp.dest(config.dev.vendors));
}

function buildVendorScriptsRelease() {
    return gulp.src(config.sources.vendor)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(config.release.vendors));
}

function buildStyles() {
    return gulp.src(config.sources.stylesheets)
        .pipe(less())
        .pipe(concat('app.css'))
        .pipe(gulp.dest(config.dev.stylesheets));
}

function buildStylesReleases() {
    return gulp.src(config.sources.stylesheets)
        .pipe(less())
        .pipe(concat('app.css'))
        .pipe(gulp.dest(config.release.stylesheets));
}