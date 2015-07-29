'use strict';

var fs = require('fs');
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('fragment generator load test.', function () {

  var xrm, genOptions = {
    'appPath': 'app',
    'skip-install': true,
    'skip-welcome-message': true,
    'skip-message': true
  };

  describe('database endpoint reached.', function () {
    before(function (done) {
      helpers.testDirectory(path.join(__dirname, '../tmp'), function (err) {
        if (err) {
          done(err);
        }
        xrm = helpers.createGenerator('xrm:database', [
           '../database'
        ], [], genOptions);
        done();
      });
    });
    
    //
    it('can be loaded by object.', function (done) {
      xrm.options.args = {
        fields: [
        {
          label: 'Auto Number',
          name: 'AutoNumber',
          required: true,
          autoNumber: { maxlength: 150 }
        }, {
          label: 'Formula',
          name: 'Formula',
          required: true,
          formula: {  }
        }, {
          label: 'Roll-Up Summary',
          name: 'RollupSummary',
          required: true,
          rollupSummary: {  }
        },
        
        {
          label: 'Category',
          name: 'Category',
          required: true,
          picklist: { values: ['Creative', 'Ideation', 'Implementation', 'Production', 'Support', 'Administrative', 'Other'] }
        }, {
        }, {
          label: 'Category',
          name: 'Category',
          required: true,
          picklist: { values: ['Creative', 'Ideation', 'Implementation', 'Production', 'Support', 'Administrative', 'Other'] }
        }, {
        }, {
          label: 'Category',
          name: 'Category',
          required: true,
          picklist: { values: ['Creative', 'Ideation', 'Implementation', 'Production', 'Support', 'Administrative', 'Other'] }
        }, {
          label: 'Category',
          name: 'Category',
          required: true,
          picklist: { values: ['Creative', 'Ideation', 'Implementation', 'Production', 'Support', 'Administrative', 'Other'] }
        }, {
          label: 'Category',
          name: 'Category',
          required: true,
          picklist: { values: ['Creative', 'Ideation', 'Implementation', 'Production', 'Support', 'Administrative', 'Other'] }
        }, {
          label: 'Category',
          name: 'Category',
          required: true,
          picklist: { values: ['Creative', 'Ideation', 'Implementation', 'Production', 'Support', 'Administrative', 'Other'] }
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
      xrm.run(function () {
        done();
      }.bind(xrm));
    });
  });
});
