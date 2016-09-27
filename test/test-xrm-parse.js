'use strict';

var XrmParse = require('../xrm-parse');
var assert = require('yeoman-assert');

var log = function (msg) { console.log(msg); assert(false); };

describe('xrm-parse test', function () {

  var xrm, ctx;

  describe('main', function () {
    before(function (done) {
      xrm = { options: {}, log: log };
      ctx = {
        label: 'Area',
        plural: 'Areas',
        description: 'My Area',
        fields: [{
          label: 'Name',
          name: 'Name',
          text: { length: 100, required: true }
        }, {
            label: 'Owner',
            name: 'Owner',
            lookup: { relatedTo: 'Person', childName: 'Owners' }
          }, {
            label: 'Revenue',
            name: 'Revenue',
            currency: {}
          }
        ],
        layouts: [{
          name: 'Main',
          layout0: {
            title: 'General Information', l: [
              ['Name', 'Owner'],
              ['ro!Revenue', '']]
          },
        }],
        lists: [{
          name: 'Main',
          l: { Name: { sortable: '{true}' } },
        }]
      };
      done();
    });
    it('can parse object', function (done) {
      XrmParse.bindCtx.call(xrm, ctx);
      assert(ctx.root === xrm);
      assert(ctx.log === xrm.log);
      assert(ctx.searchPaths[0] === process.cwd());
      assert(ctx.schemaName === '');
      assert(ctx.name === 'entity');
      assert(ctx.id === 'entityId');
      assert(ctx.Id === 'entityId');
      assert(!ctx.relations);
      assert(!ctx.recordTypes);
      assert(ctx.fields['Name']);
      assert(ctx.layouts['Main']);
      assert(ctx.lists['Main']);
      done();
    });
    it('can add searchPaths', function (done) {
      xrm.options.searchPaths = 'newPath';
      XrmParse.bindCtx.call(xrm, ctx);
      assert(ctx.searchPaths[1] === 'newPath');
      done();
    });
    it('can set schemaName', function (done) {
      ctx.schemaName = 'newName';
      XrmParse.bindCtx.call(xrm, ctx);
      assert(ctx.schemaName === 'newName');
      done();
    });
    it('can set name', function (done) {
      ctx.name = 'Object';
      XrmParse.bindCtx.call(xrm, ctx);
      assert(ctx.name === 'Object');
      assert(ctx.id === 'objectId');
      assert(ctx.Id === 'ObjectId');
      done();
    });
    it('can add relations', function (done) {
      ctx.relations = [{ name: 'Name', relatedTo: 'Name' }];
      XrmParse.bindCtx.call(xrm, ctx);
      assert(ctx.relations.length === 1);
      done();
    });
    it('can add recordTypes', function (done) {
      ctx.recordTypes = ['Type1'];
      XrmParse.bindCtx.call(xrm, ctx);
      assert(ctx.recordTypes.length === 1);
      done();
    });
    it('check fields', function (done) {
      XrmParse.bindCtx.call(xrm, ctx);
      var field = ctx.fields['Name'];
      assert(field.id === 'name');
      assert(field.Id === 'Name');
      done();
    });
    it('check layouts', function (done) {
      XrmParse.bindCtx.call(xrm, ctx);
      var layout = ctx.layouts['Main'];
      assert(layout.pack);
      // console.log(layout.pack);
      assert(!layout.pack.related);
      assert(layout.pack.b[0].title === 'General Information');
      assert(layout.pack.b[0].p.length === 2);
      done();
    });
    it('check lists', function (done) {
      XrmParse.bindCtx.call(xrm, ctx);
      var list = ctx.lists['Main'];
      done();
    });
  });
});
