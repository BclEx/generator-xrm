'use strict';

var fs = require('fs');
var path = require('path');
var yeoman = require('yeoman-generator');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('database test', function () {

  var xrm, genOptions = {
    'appPath': 'app',
    'skip-install': true,
    'skip-welcome-message': true,
    'skip-message': true
  };

  var createDummyGenerator = function () {
    return yeoman.generators.Base.extend({
      database: function () {
        xrm.ctx = this.options.ctx;
      }
    });
  };

  describe('main', function () {
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
          label: 'Name',
          name: 'Name',
          text: { maxlength: 150 }
        }, {
            label: 'Category',
            name: 'Category',
            picklist: { values: ['Creative', 'Ideation', 'Implementation', 'Production', 'Support', 'Administrative', 'Other'] }
          }, {
            label: 'Metadata',
            name: 'Metadata',
            text: { maxlength: 2000 }
          }]
      };
      xrm.run(function () {
        console.log(this.ctx);
        var a = this.ctx.createTable;
        assert(a.createTable == 'test');
        assert(Array.isArray(a.t));
        var t = a.t;
        // console.log(t[0]);
        assert(t[0].uuid.name == 'testId');
        assert(t[1].datetime.name == 'CreateOn');
        assert(t[2].uuid.name == 'CreateBy');
        assert(t[3].datetime.name == 'ModifyOn');
        assert(t[4].uuid.name == 'ModifyBy');
        assert(t[5].string.name == 'Name');
        assert(t[6].string.name == 'Category');
        assert(t[7].string.name == 'Metadata');
        done();
      }.bind(xrm));
    });
    it('can have record types', function (done) {
      xrm.options.ctx = {
        name: 'test',
        recordTypes: ['one'],
        fields: [{
          label: 'Name',
          name: 'Name',
          text: { maxlength: 150 }
        }]
      };
      xrm.run(function () {
        console.log(this.ctx);
        var a = this.ctx.createTable;
        assert(a.createTable == 'test');
        assert(Array.isArray(a.t));
        var t = a.t;
        // console.log(t[0]);
        assert(t[0].uuid.name == 'testId');
        assert(t[1].datetime.name == 'CreateOn');
        assert(t[2].uuid.name == 'CreateBy');
        assert(t[3].datetime.name == 'ModifyOn');
        assert(t[4].uuid.name == 'ModifyBy');
        assert(t[5].string.name == 'RecordType');
        assert(t[6].string.name == 'Name');
        done();
      }.bind(xrm));
    });
    it('can have relations', function (done) {
      xrm.options.ctx = {
        name: 'test',
        fields: [{
          label: 'Name',
          name: 'Name',
          text: { maxlength: 150 }
        }],
        relations: [{
          label: 'Primary Members',
          name: 'PrimaryMember',
          relatedTo: 'Object'
        }]
      };
      xrm.run(function () {
        console.log(this.ctx);
        var a = this.ctx.createTable;
        assert(a.createTable == 'test');
        assert(Array.isArray(a.t));
        var t = a.t;
        // console.log(t[0]);
        assert(t[0].uuid.name == 'testId');
        assert(t[1].datetime.name == 'CreateOn');
        assert(t[2].uuid.name == 'CreateBy');
        assert(t[3].datetime.name == 'ModifyOn');
        assert(t[4].uuid.name == 'ModifyBy');
        assert(t[5].string.name == 'Name');
        done();
      }.bind(xrm));
    });
  });
});
