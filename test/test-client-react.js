'use strict';

var fs = require('fs');
var path = require('path');
var yeoman = require('yeoman-generator');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');

describe('client-react test', function () {

  var xrm, genOptions = {
    'appPath': 'app',
    'skip-install': true,
    'skip-welcome-message': true,
    'skip-message': true
  };

  var createDummyGenerator = function () {
    return yeoman.Base.extend({
      clientReact: function () {
        xrm.ctx = this.options.ctx;
      }
    });
  };

  describe('main', function () {
    before(function (done) {
      var deps = [
        '../client-react',
        [createDummyGenerator(), 'fragment:html'],
        [createDummyGenerator(), 'fragment:css'],
        [createDummyGenerator(), 'fragment:js']
      ];
      helpers.testDirectory(path.join(__dirname, '../tmp'), function (err) {
        if (err) {
          done(err);
        }
        xrm = helpers.createGenerator('xrm-core:client-react', deps, [], genOptions);
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
        //console.log(this.ctx);
        done();
      }.bind(xrm));
    });
  });
});
