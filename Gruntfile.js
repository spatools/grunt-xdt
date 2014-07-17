/*
 * grunt-xdt
 * https://github.com/spatools/grunt-xdt
 *
 * Copyright (c) 2014 
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js'
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Configuration to be run (and then tested).
    xdt: {
        debug: {
            src: 'test/Web.config',
            dest: 'test/Web.Result.config',
            options: {
                transform: 'test/Web.Release.config',
            }
        }
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'xdt']);

};
