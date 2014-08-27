module.exports = function(grunt) {

  // load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);

  // Add the grunt-mocha-test tasks.
  grunt.loadNpmTasks('grunt-mocha-test');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'mochaTest']);


  // Plugin configuration(s).
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: ['package.json', 'Gruntfile.js', 'src/**/*.js', 'test/**/*.js']
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'dot'
        },
        src: ['test/**/*.js']
      }
    }
  });
};
