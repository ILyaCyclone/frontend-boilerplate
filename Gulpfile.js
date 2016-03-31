var gulp = require('gulp-help')(require('gulp')),
    bower = require('gulp-bower')
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    autoprefixer = require('gulp-autoprefixer');

var basicConfig = {
     srcDir: './src',
    destDir: './static',
     bowerDir: './bower_components' 
};

var config = {
    scss: {
        src: basicConfig.srcDir + '/scss',
        dest: basicConfig.destDir + '/css'
    },

    imgs: {
        src: basicConfig.srcDir + '/imgs',
        dest: basicConfig.destDir + '/imgs'
    },

    js: {
        src: basicConfig.srcDir + '/js/main.js',
        dest: basicConfig.destDir + '/js'
    },

    // 3rd party libs
    jquery: basicConfig.bowerDir + '/jquery/dist/jquery.min.js',

    bootstrap: {
        js: basicConfig.bowerDir + '/bootstrap-sass/assets/javascripts/bootstrap.min.js',
        scss: basicConfig.bowerDir + '/bootstrap-sass/assets/stylesheets'
    },

    font: {
        icons: basicConfig.bowerDir + '/font-awesome/fonts/*.**',
        scss: basicConfig.bowerDir + '/font-awesome/scss',
        dest: basicConfig.destDir + '/fonts'
    }
};

// install dependencies
gulp.task('bower', 'runs bower', function() { 
    return bower()
         .pipe(gulp.dest(basicConfig.bowerDir)) 
});

// update dependencies
gulp.task('update', 'updates the bower dependencies', function() {
    return bower({ cmd: 'update' });
});

gulp.task('icons', 'copies the icons to destDir', function() { 
    return gulp.src(config.font.icons) 
        .pipe(gulp.dest(config.font.dest)); 
});

gulp.task('image', 'optimizes the images', function() {
    return gulp.src(config.imgs.src + '/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [
                { removeViewBox: false },
                { cleanupIDs: false }
            ]
        }))
        .pipe(gulp.dest(config.imgs.dest));
});

gulp.task('sass', 'compiles all scss files to one css file', function () {
    return gulp.src(config.scss.src + '/**/*.scss')
        .pipe(sass({
            outputStyle: 'compressed',
            precision: 8,
            includePaths: [
                basicConfig.srcDir + '/scss',
                 config.bootstrap.scss,
                 config.font.scss
            ]})
            .on('error', notify.onError(function(error) {
                return "Error: " + error.message;
            })))
        .pipe(autoprefixer('last 2 version'))
        .pipe(rename({basename: 'styles', extname: '.min.css'}))
        .pipe(gulp.dest(config.scss.dest));
});


gulp.task('scripts', 'concates all js files to one js file', function() {
    return gulp.src([config.jquery,
                     config.bootstrap.js,
                     config.js.src])
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.js.dest));
});

// Watch for file changes
 gulp.task('watch', 'watches for .scss and .js changes', function() {
     gulp.watch(config.scss.src + '/*.scss', ['sass']); 
    gulp.watch(config.js.src + '/*.js', ['scripts'])
});

  gulp.task('default', 'default command', ['bower', 'icons', 'sass', 'scripts']);
