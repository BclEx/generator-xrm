'use strict';

var fs = require('fs');
var path = require('path');
var yeoman = require('yeoman-generator');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');

describe('fieldTypes test', function () {

  var xrm, genOptions = {
    'appPath': 'app',
    'skip-install': true,
    'skip-welcome-message': true,
    'skip-message': true
  };

  var createDummyGenerator = function () {
    return yeoman.Base.extend({
      test: function () {
        xrm.ctx = this.options.ctx;
      }
    });
  };

  describe('database endpoint reached', function () {
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
        name: 'test',
        fields: [{
          label: 'Auto Number',
          name: 'AutoNumber',
          autoNumber: { maxlength: 150 }
        }, {
            label: 'Formula',
            name: 'Formula',
            formula: { returnType: 'checkbox', formula: '1+1' }
          }, {
            label: 'Roll-Up Summary',
            name: 'RollupSummary',
            rollupSummary: {}
          }, {
            label: 'Lookup Relationship',
            name: 'Lookup',
            lookup: { relatedTo: 'entity', childName: 'child', required: true, ondelete: 'clearvalue' }
          }, {
            label: 'Master Detail',
            name: 'MasterDetail',
            masterDetail: { relatedTo: 'entity', childName: 'child', required: true }
          }, {
            label: 'External Lookup',
            name: 'ExternalLookup',
            externalLookup: { relatedTo: 'entity' }
          }, {
            label: 'Checkbox',
            name: 'Checkbox',
            checkbox: { defaultValue: true }
          }, {
            label: 'Currency',
            name: 'Currency',
            currency: { length: 18, scale: 0, required: true, defaultValue: 0 }
          }, {
            label: 'Date',
            name: 'Date',
            date: { required: true, defaultValue: '' }
          }, {
            label: 'DateTime',
            name: 'DateTime',
            dateTime: { required: true, defaultValue: '' }
          }, {
            label: 'Email',
            name: 'Email',
            email: { required: true, unique: true, externalId: true, defaultValue: '' }
          }, {
            label: 'Geolocation',
            name: 'Geolocation',
            geolocation: { displayFormat: 'decimal', scale: 0, required: true }
          }, {
            label: 'Number',
            name: 'Number',
            number: { length: 18, scale: 0, required: true, unique: true, defaultValue: '' }
          }, {
            label: 'Percent',
            name: 'Percent',
            percent: { length: 18, scale: 0, required: true, defaultValue: '' }
          }, {
            label: 'Phone',
            name: 'Phone',
            phone: { required: true, defaultValue: '' }
          }, {
            label: 'Picklist',
            name: 'Picklist',
            picklist: { values: ['One', 'Two'], sort: true, defaultFirst: true }
          }, {
            label: 'Picklist-Multi',
            name: 'PicklistMulti',
            picklistMulti: { values: ['One', 'Two'], sort: true, defaultFirst: true, visibleLines: 4 }
          }, {
            label: 'Text',
            name: 'Text',
            text: { length: 255, required: true, unique: true, externalId: true, defaultValue: '', option_casesensitive: true }
          }, {
            label: 'Text Area',
            name: 'TextArea',
            textArea: { required: true, defaultValue: '' }
          }, {
            label: 'Text Area (Long)',
            name: 'TextAreaLong',
            textAreaLong: { length: 300, visibleLInes: 4, defaultValue: '' }
          }, {
            label: 'Text Area (Rich)',
            name: 'TextAreaRich',
            textAreaRich: { length: 300, visibleLInes: 6 }
          }, {
            label: 'Text Encrypted',
            name: 'TextEncrypted',
            textEncrypted: { length: 255, required: true, mastType: 'maskall', maskCharacter: '*' }
          }, {
            label: 'Url',
            name: 'Url',
            url: { required: true, defaultValue: '' }
          }]
      };
      xrm.run(function () {
        done();
      }.bind(xrm));
    });
  });
});
