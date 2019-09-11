var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    del = require('del'),
    //critical = require('critical').stream,
    browserSync = require('browser-sync');

// #########################################################################
//  connect files
// #########################################################################

// //connect each css file
// var cssFilesEach  = [
//     './src/css/file1.css',
//     './src/css/file2.css',
// ];

//connect file bundle css
var cssFilesBundle = [
    './src/css/bootstrap-reboot.css',
    './src/css/bootstrap-grid.css',
    './src/css/style.css',
];

//connect each js file
var jsFilesEach = [
    './src/js/script.js'
];

// //connect file bundle js
// var jsFilesBundle = [
//     './src/js/main.js',
//     './src/js/script.js'
// ];

// #########################################################################
//  sass
// #########################################################################

//task sass
gulp.task('sass', function(){
    return gulp.src('./src/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./src/css'));
});

// #########################################################################
//  css bundle
// #########################################################################

//task prefix-concat
gulp.task('prefix-concat', function(){
    return gulp.src(cssFilesBundle)
    .pipe(autoprefixer())
    .pipe(concat("main.css"))
    .pipe(gulp.dest('./css'));
});// cmd $ npx browserslist

//task css-min
gulp.task('css-min', function(){
    return gulp.src('./css/main.css')
    .pipe(cleanCSS({level: 2}))
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

//task build-css
gulp.task('build-css-bundle', gulp.series('sass', 'prefix-concat', 'css-min'));

// #########################################################################
//  css each
// #########################################################################

// //task prefix
// gulp.task('prefix', function(){
//     return gulp.src(cssFilesEach)
//     .pipe(autoprefixer())
//     .pipe(gulp.dest('./css'))
//     .pipe(cleanCSS({level: 2}))
//     .pipe(rename({suffix:'.min'}))
//     .pipe(gulp.dest('./css'))
//     .pipe(browserSync.stream());
// });// cmd $ npx browserslist

// //task build-css
// gulp.task('build-css-each', gulp.series('sass', 'prefix'));

// #########################################################################
//  js bundle
// #########################################################################

// //task build-js-bundle
// gulp.task('build-js-bundle', function(){
//     return gulp.src(jsFilesBundle)
//     .pipe(concat("main.js"))
//     .pipe(gulp.dest('./js'))
//     .pipe(uglify())
//     .pipe(rename({suffix:'.min'}))
//     .pipe(gulp.dest('./js'))
//     .pipe(browserSync.stream());
// });

// #########################################################################
//  js files each
// #########################################################################

//task build-js-each
gulp.task('build-js-each', function(){
    return gulp.src(jsFilesEach)
    .pipe(gulp.dest('./js'))
    .pipe(uglify())
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest('./js'))
    .pipe(browserSync.stream());
});

// #########################################################################
//  browser-sync
// #########################################################################

gulp.task('browser-sync', function(){
    browserSync({
        //proxy: 'test.site'
        server:{
            baseDir:'./'
        }
    });

    gulp.watch('./src/scss/**/*.scss', gulp.series(
        'build-css-bundle',
        //'build-css-each'
        ));
    gulp.watch('./src/js/**/*.js', gulp.series(
        //'build-js-bundle',
        'build-js-each'
        ));
    gulp.watch('./**/*html').on('change', browserSync.reload);
});

// #########################################################################
//  watch
// #########################################################################

gulp.task('watch', gulp.series(
    gulp.parallel(
        'build-css-bundle',
        //'build-js-bundle',
    ),
    gulp.parallel(
        //'build-css-each',
        'build-js-each',
    ),
    'browser-sync'
));

// #########################################################################
//  critical css
// #########################################################################

// gulp.task('critical', function () {
//     return gulp.src('./dist/*.html')
//     .pipe(critical({
//         base: 'dist/',
//         inline: true,
//         ignore: ['@charset', '@import'],
//         css: './dist/css/bundle.min.css'
//     }))
//     .on('error', function(err) { log.error(err.message); })
//     .pipe(gulp.dest('dist'));
// });
