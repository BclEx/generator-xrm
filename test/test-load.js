'use strict';

var fs = require('fs');
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('load test.', function () {

  it('can be imported without blowing up.', function () {
    assert(require('../app') !== undefined);
    assert(require('../client-angular') !== undefined);
    assert(require('../database') !== undefined);
    //assert(require('../server-aspnet') !== undefined);
  });

  var xrm, genOptions = {
    'appPath': 'app',
    'skip-install': true,
    'skip-welcome-message': true,
    'skip-message': true
  };

  describe('load context by name.', function () {
    before(function (done) {
      helpers.testDirectory(path.join(__dirname, '../tmp'), function (err) {
        if (err) {
          done(err);
        }
        fs.writeFileSync(path.join(__dirname, '../tmp', 'name-x.js'),
'{\
	key: "value0",\
	func: function () { return "value1"; } \
}', 'utf8');
        xrm = helpers.createGenerator('xrm:app', [
           '../app'
        ], ['name-x'], genOptions);
        done();
      });
    });
    it('can be loaded by name.', function (done) {
      xrm.run(function () {
        assert(this.options.ctx.key == 'value0');
        assert(this.options.ctx.func() == 'value1');
        done();
      }.bind(xrm));
    });
  });

  describe('load context by object.', function () {
    before(function (done) {
      helpers.testDirectory(path.join(__dirname, '../tmp'), function (err) {
        if (err) {
          done(err);
        }
        xrm = helpers.createGenerator('xrm:app', [
           '../app'
        ], [{
          key: "value0",
          func: function () { return "value1"; }
        }], genOptions);
        done();
      });
    });
    it('can be loaded by object.', function (done) {
      xrm.run(function () {
        assert(this.options.ctx.key == 'value0');
        assert(this.options.ctx.func() == 'value1');
        done();
      }.bind(xrm));
    });
  });

});
