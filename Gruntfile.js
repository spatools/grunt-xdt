/*
 * grunt-xdt
 * https://github.com/spatools/grunt-xdt
 *
 * Copyright (c) 2014 
 * Licensed under the MIT license.
 */

"use strict";

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        "Gruntfile.js",
        "tasks/*.js"
      ],
      options: {
        jshintrc: ".jshintrc",
      },
    },

    // Configuration to be run (and then tested).
    xdt: {
        debug: {
            src: "test/Web.config",
            dest: "test/results/Web.Result.config",
            options: {
                transform: "test/Web.Release.config",
            }
        },
        test: {
            src: "test/Web2.config",
            dest: "test/results/Web2.Result.config",
            options: {
                transform: "test/Web2.Release.config",
            }
        },
        all: {
            src: [
                "test/Web.config",
                "test/Web2.config"
            ],
            dest: "test/results/",
            options: {
                transform: "test/Web.Release.config",
            }
        }
    }
  });

  // Actually load this plugin"s task(s).
  grunt.loadTasks("tasks");

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks("grunt-contrib-jshint");

  // By default, lint and run all tests.
  grunt.registerTask("default", ["jshint", "xdt"]);

};
