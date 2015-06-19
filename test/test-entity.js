'use strict';

var fs = require('fs');
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('fragment generator load test', function () {

  var xrm, genOptions = {
    'appPath': 'app',
    'skip-install': true,
    'skip-welcome-message': true,
    'skip-message': true
  };

  describe('entity test', function () {
    before(function (done) {
      helpers.testDirectory(path.join(__dirname, '../tmp'), function (err) {
        if (err) {
          done(err);
        }
        xrm = helpers.createGenerator('xrm:database', [
           '../database'
        ], [null], genOptions);
        done();
      });
    });
    
    //
    it('can be loaded by object', function (done) {
      xrm.options.args = {
        label: 'Object',
        plural: 'Objects',
        description: 'Description',
        fields: [{
          label: 'Object Name',
          name: 'Name',
          required: true,
          text: { length: 80 }
        }]
      };
      xrm.run({}, function () {
        done();
      }.bind(xrm));
    });
  });
});
