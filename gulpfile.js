const gulp = require('gulp'),
    browserSync = require('browser-sync').create();
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    pipeline = require('readable-stream').pipeline,
    concat = require('gulp-concat'),
    inject = require('gulp-inject-string');

const scripts = {
    con: [//contabilizacion
        './contabilizacion/js/context.js',
        './contabilizacion/js/controller.js',
        './contabilizacion/js/model.js',
        './contabilizacion/js/services.conf.js',
        './contabilizacion/js/fn_templates.js',
        './contabilizacion/js/templates.js',
        './contabilizacion/js/plugins/input_text.js',
        './contabilizacion/js/plugins/combo_select.js',
        './contabilizacion/js/plugins/radiobutton.js',
        './contabilizacion/js/plugins/checkbox.js',
        './contabilizacion/js/plugins/search_list.js',
        './contabilizacion/js/validations.js',
        './contabilizacion/js/announcement.js'
    ]
};

gulp.task('concat-con', function () {
    gulp.src(scripts.con)
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('./contabilizacion/js/dist/'))
        .pipe(inject.wrap('(function () {', '})();'))
        .pipe(rename('bundle.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./contabilizacion/js/dist/'));
});

gulp.task('build', ['concat-con'], function() {
    console.log("Successfully Build");
});

gulp.task('sass', function () {
    gulp.src('./scss/style.scss')
    .pipe(sass({
        outputStyle: 'compressed'
    }))
    .pipe(autoprefixer({
        browsers: ['cover 99.5%']
    }))
    .pipe(gulp.dest('./contabilizacion/css'))
    .pipe(browserSync.stream());
});


gulp.task('js-watch', function (done) {
    browserSync.reload();
    done();
});

gulp.task('server',()=>{
    browserSync.init({
        watch: false,
        server: "./"
    });
    gulp.watch('./scss/**/*.scss',['sass']);
    gulp.watch(['./contabilizacion/js/**/*.js', '!./contabilizacion/js/dist/*.js'], ['concat-con']);
});


gulp.task('default',()=>{
    browserSync.init({
        watch: false,
        port: 3000,
        server: "./"
    });
    gulp.watch('./scss/**/*.scss',['sass']);
    gulp.watch(['./contabilizacion/js/**/*.js', '!./contabilizacion/js/dist/*.js'], ['concat-con']);
    gulp.watch(['./contabilizacion/js/dist/bundle.min.js'], ['js-watch']);
    gulp.watch('./**/*.html').on('change', browserSync.reload);
});
