'use strict';
const gulp = require('gulp');
const browserify = require('browserify');
const watchify = require('watchify');
const babelify = require('babelify');
const vueify = require('vueify');

const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const exit = require('gulp-exit');
const sourcemaps = require('gulp-sourcemaps');

const pipeline = require('readable-stream').pipeline;

const jsEntryPoint = './src/index.js';
const jsBundledName = 'app.js';

sass.compiler = require('node-sass');

function onError(err) {
  console.log(err);
  this.emit('end');
}

function compile(watch) {
  const bundler = watchify(browserify({ entries: [jsEntryPoint], paths: ['./src/'] })
    .transform(vueify)
    .transform(babelify, {
      presets: ["@babel/preset-env"],
      sourceMaps: true
    })
  );

  function rebundle() {
    return pipeline(
      bundler.bundle().on('error', onError),
      source(jsEntryPoint.match(/(?!.*\/).*/)[0]),
      buffer(),
      rename(jsBundledName.replace(/(?!.*\.).*$/, 'min.' + jsBundledName.match(/(?!.*\.).*$/)[0])),
      sourcemaps.init({ loadMaps: true }),
      uglify(),
      sourcemaps.write('./'),
      gulp.dest('./dist/')
    );
  }

  if (watch) {
    bundler.on('update', () => {
      console.log('-> bundling JS...');
      rebundle();
    });
    bundler.on('log', () => console.log('-> JS bundled'));

    rebundle();
  } else {
    pipeline(
      rebundle(),
      exit()
    );
  }
}

const watch = () => compile(true);

gulp.task('build-js', compile);

gulp.task('watch-js', watch);

gulp.task('build-sass', () =>
  pipeline(
    gulp.src('./src/**/*.scss'),
    sourcemaps.init(),
    sass({ outputStyle: 'compressed' })
      .on('error', sass.logError),
    sourcemaps.write('./')
      .on('error', onError),
    gulp.dest('./dist/css'),
  ).on('end', () => console.log('-> CSS compiled'))
);

gulp.task('watch-sass', () => 
  gulp.watch('./src/**/*.scss', gulp.series('build-sass'))
);

gulp.task('start', gulp.series('build-sass', gulp.parallel('watch-js', 'watch-sass')));