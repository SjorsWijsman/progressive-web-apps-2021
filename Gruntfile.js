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
    copy: {
      main: {
        files: [
          {
            expand: true,
            flatten: true,
            src: ['static/*'], 
            dest: 'dist/',
            filter: 'isFile'
          },
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
}
