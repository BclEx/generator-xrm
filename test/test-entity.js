'use strict';

var fs = require('fs');
var path = require('path');
var yeoman = require('yeoman-generator');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('fragment generator load test', function () {

  var xrm, genOptions = {
    'appPath': 'app',
    'skip-install': true,
    'skip-welcome-message': true,
    'skip-message': true
  };

  var createDummyGenerator = function () {
    return yeoman.generators.Base.extend({
      test: function () {
        xrm.ctx = this.options.ctx;
      }
    });
  };

  describe('entity test', function () {
    before(function (done) {
      var deps = [
        '../database',
        [createDummyGenerator(), 'fragment:sql']
      ];
      helpers.testDirectory(path.join(__dirname, '../tmp'), function (err) {
        if (err) {
          done(err);
        }
        xrm = helpers.createGenerator('xrm:database', deps, [], genOptions);
        done();
      });
    });
    it('can be loaded by object', function (done) {
      xrm.options.ctx = {
        label: 'Object',
        plural: 'Objects',
        description: 'Description',
        fields: [{
          label: 'Object Name',
          name: 'Name',
          text: { length: 80 }
        }]
      };
      xrm.run(function () {
        done();
      }.bind(xrm));
    });
  });
});
