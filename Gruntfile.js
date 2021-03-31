const grunt = require('grunt');

module.exports = (grunt) => {
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
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'dist/',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/',
          ext: '.min.css'
        }]
      }
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
      },
      resources: {
        files: [
          {
            cwd: 'static/',
            expand: true,
            src: ['resources/**/*'],
            dest: 'dist/',
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
}
