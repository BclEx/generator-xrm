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

  describe('database endpoint reached', function () {
    before(function (done) {
      var deps = [
        [helpers.createDummyGenerator(), 'fragment:sql']
      ];

      helpers.testDirectory(path.join(__dirname, '../tmp'), function (err) {
        if (err) {
          done(err);
        }
        xrm = helpers.createGenerator('xrm:database', [
          '../database',
          '../generator-fragment'
        ], [null], genOptions);
        done();
      });
    });
    it('can be loaded by object', function (done) {
      xrm.options.args = {
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
            picklist: { values: ['Creative', 'Ideation', 'Implementation', 'Production', 'Support', 'Administrative', 'Other'] }
          }, {
            label: 'Metadata',
            name: 'Metadata',
            memo: { maxlength: 2000 }
          }]
      };
      xrm.run({}, function () {
        done();
      }.bind(xrm));
    });
  });
});
