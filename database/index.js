/*
 * generator-xrm
 * https://github.com/BclEx/generator-xrm
 *
 * Copyright (c) 2015 Sky Morey, contributors
 * Licensed under the MIT license.
 */

'use strict';

// External libs.
var util = require('util');
var scriptBase = require('../script-base.js');
var yeoman = require('yeoman-generator');
var debug = require('debug')('generator:xrm');
var chalk = require('chalk');
var Location = require('../util').Location;
var _ = require('lodash');

var Generator = module.exports = function Generator() {
  this._moduleName = 'xrm:database';
  scriptBase.apply(this, arguments);
  var done = this.async();
  this.on('end', function () {
    done();
  });
};
util.inherits(Generator, scriptBase);

var Relation = require('./index/relation');
var Table = require('./index/table');
var View = require('./index/view');

Generator.prototype.createFiles = function createFiles() {
  debug('Defining database');
  var database = this.options.database || 'mssql';
  var ctx = this.options.ctx;
  var ctxName = ctx.name;
  var schemaName = ctx.schemaName;
  var schemaFolder = schemaName || 'dbo';

  // build content
  var location = this.location || new Location();
  var s0 = Table.build.call(this, database, ctx);
  var sqlCtx = {
    _name: ctxName,
    _file: location.getEnsuredPath(schemaFolder + '/Tables', ctxName + '.sql'),
    _client: database,
    createTable: { schemaName: schemaName, createTable: ctxName, t: s0 }
  };
  var children = sqlCtx._children = [];
  if (ctx.hasOwnProperty('relations')) {
    _.forEach(ctx.relations, function (x) {
      var name = x.name;
      var s1 = Relation.build.call(this, database, ctx, x);
      children.push({
        _name: ctxName + '_' + name,
        _file: location.getEnsuredPath(schemaFolder + '/Tables', ctxName + '_' + name + '.sql'),
        createTable: { schemaName: schemaName, createTable: ctxName + '_' + name, t: s1 }
      });
    });
  }
  var s2 = View.build.call(this, database, ctx, schemaName);
  children.push({
    _name: ctxName + 'View',
    _file: location.getEnsuredPath(schemaFolder + '/Views', ctxName + 'View.sql'),
    createTable: { schemaName: schemaName, createView: ctxName + 'View', t: s2 }
  });
  // console.log(sqlCtx);
  this.composeWith('fragment:sql', { options: { ctx: sqlCtx } });
};
