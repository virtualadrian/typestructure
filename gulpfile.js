var gulp = require('gulp');
var exec = require('child_process').exec;

/**
 * Simple hook to run tsc before debug.
 * You can use this to perform any pre debug tasks
 */
gulp.task('pre-debug-build', function (callback) {
    exec('tsc', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        callback(err);
    });
});