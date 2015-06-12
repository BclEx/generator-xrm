'use strict';

var path = require('path');
var fs = require('fs');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('fragment generator load test', function () {

  var angular, genOptions = {
    'appPath': 'app',
    'skip-install': true,
    'skip-welcome-message': true,
    'skip-message': true
  };

  describe('database reached', function () {
    before(function (done) {
      helpers.testDirectory(path.join(__dirname, '../tmp'), function (err) {
        if (err) {
          done(err);
        }
        angular = helpers.createGenerator('xrm:database', [
           '../database'
        ], [{
          fields: [
          {
            label: 'Name',
            name: 'Name',
            required: true,
            text: { maxlength: 150 }
          }, {
            label: 'Category',
            name: 'Category',
            required: true,
            picklist: { values: ['Creative', 'Ideation', 'Implementation', 'Production', 'Support', 'Administrative', 'Other' ] }
          }, {
            label: 'Metadata',
            name: 'Metadata',
            memo: { maxlength: 2000 }
          }]
        }], genOptions);
        done();
      });
    });
    it('can be loaded by object', function (done) {
      angular.run({}, function () {
        done();
      }.bind(angular));
    });
  });
});
