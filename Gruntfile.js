const grunt = require('grunt');

module.exports = function(grunt) {
  grunt.initConfig({
    concat: {
      options: {
        separator: ';',
      },
      js: {
        src: 'static/js/*.js',
        dest: 'dist/script.js'
      },
      css: {
        src: 'static/style/*.css',
        dest: 'dist/style.css',
      },

    },
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.registerTask('default', 'concat');
}
