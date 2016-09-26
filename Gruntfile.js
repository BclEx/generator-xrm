/*
 * generator-fragment
 * https://github.com/BclEx/generator-fragment
 *
 * Copyright (c) 2015 Sky Morey, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: [
        'Gruntfile.js',
        //'jsx.js',
        'script-base.js',
        'theme-base.js',
        'util.js',
        'xrm-parse.js',
        'app/**/*.js',
        //'client-angular/**/*.js',
        'client-react/**/*.js',
        'database/**/*.js',
        'server-aspnet/**/*.js',
        'theme-plain/**/*.js',
        'theme-slds-angular/**/*.js',
        'theme-slds-react/**/*.js',
        'test/**/*.js',
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    },

    simplemocha: {
      options: {
        ui: 'bdd',
        reporter: 'spec'
      },
      all: 'test/**/*.js'
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-simple-mocha');

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'simplemocha']);
};