'use strict';
// jshint multistr: true

var fs = require('fs');
var path = require('path');
var yeoman = require('yeoman-generator');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');

describe('load test.', function () {

  it('can be imported without blowing up.', function () {
    assert(require('../app') !== undefined);
    assert(require('../client-angular') !== undefined);
    assert(require('../client-react') !== undefined);
    assert(require('../database') !== undefined);
    assert(require('../server-aspnet') !== undefined);
  });

  var xrm, genOptions = {
    'appPath': 'app',
    'skip-install': true,
    'skip-welcome-message': true,
    'skip-message': true
  };

  var createDummyGenerator = function () {
    return yeoman.Base.extend({
      app: function () {
        xrm.ctx = this.options.ctx;
      }
    });
  };

  describe('load context by name.', function () {
    before(function (done) {
      var deps = [
        '../app', '../database', '../client-react', '../server-aspnet',
        [createDummyGenerator(), 'fragment:html'],
        [createDummyGenerator(), 'fragment:cs'],
        [createDummyGenerator(), 'fragment:css'],
        [createDummyGenerator(), 'fragment:js'],
        [createDummyGenerator(), 'fragment:sql']
      ];
      helpers.testDirectory(path.join(__dirname, '../tmp'), function (err) {
        if (err) {
          done(err);
        }
        fs.writeFileSync(path.join(__dirname, '../tmp', 'name-x.js'),
          '{\
	key: "value0",\
	func: function () { return "value1"; } \
}', 'utf8');
        xrm = helpers.createGenerator('xrm-core:database', deps, ['name-x'], genOptions);
        done();
      });
    });
    it('can be loaded by name.', function (done) {
      xrm.run(function () {
        // assert(this.options.ctx.key === 'value0');
        // assert(this.options.ctx.func() === 'value1');
        done();
      }.bind(xrm));
    });
  });

  describe('load context by object.', function () {
    before(function (done) {
      var deps = [
        '../app', '../database', '../client-react', '../server-aspnet',
        [createDummyGenerator(), 'fragment:html'],
        [createDummyGenerator(), 'fragment:cs'],
        [createDummyGenerator(), 'fragment:css'],
        [createDummyGenerator(), 'fragment:js'],
        [createDummyGenerator(), 'fragment:sql']
      ];
      helpers.testDirectory(path.join(__dirname, '../tmp'), function (err) {
        if (err) {
          done(err);
        }
        xrm = helpers.createGenerator('xrm-core:database', deps, [{
          name: 'name-x',
          key: 'value0',
          func: function () { return 'value1'; }
        }], genOptions);
        done();
      });
    });
    it('can be loaded by object.', function (done) {
      xrm.run(function () {
        // assert(this.options.ctx.key === 'value0');
        // assert(this.options.ctx.func() === 'value1');
        done();
      }.bind(xrm));
    });
  });

});
