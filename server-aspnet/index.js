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
var debug = require('debug')('generator:xrm-core');
var chalk = require('chalk');
var Location = require('../util').Location;
var _ = require('lodash');

var Generator = module.exports = function Generator() {
  this._moduleName = 'xrm-core:server-aspnet';
  scriptBase.apply(this, arguments);
  var done = this.async();
  this.on('end', function () {
    done();
  });
};
util.inherits(Generator, scriptBase);

var Controller = require('./index/controller');
var Model = require('./index/model');
var Repository = require('./index/repository');
var ServiceRepository = require('./index/service-repository');

Generator.prototype.createFiles = function createFiles() {
  debug('Defining server');
  var ctx = this.getCtx(this.options.ctx || this.ctx);
  var ctxName = ctx.name;
  var schemaName = 'CORE.Site';

  // build content
  var location = this.location || { api: null, server: null };
  var locationApi = location.api || new Location();
  // var locationServer = location.server || new Location();
  var s0 = [];
  Controller.build.call(this, s0, ctx);
  var csCtx = {
    _name: ctxName,
    _file: locationApi.getEnsuredPath('Controllers', ctxName + 'Controller.cs'),
    controller: { append: s0 }
  };
  var children = csCtx._children = [];
  var usings = [];
  var s1 = Model.build.call(this, ctx, usings);
  children.push({
    _name: ctxName,
    _file: locationApi.getEnsuredPath('Models', ctxName + 'Model.cs'),
    model: { usings: usings, schemaName: schemaName, createClass: ctxName + 'Model', t: s1 }
  });
  var s2 = [];
  var database = this.options.database || 'mssql';
  Repository.build.call(this, s2, ctx, database);
  children.push({
    _name: ctxName,
    _file: locationApi.getEnsuredPath('Repositories', ctxName + 'Repository.cs'),
    repository: { append: s2 }
  });
  var s3 = [];
  ServiceRepository.build.call(this, s3, ctx, database);
  children.push({
    _name: ctxName,
    _file: locationApi.getEnsuredPath('Repositories', ctxName + 'ServiceRepository.cs'),
    repository: { append: s3 }
  });

  //console.log(csCtx);
  this.composeWith('fragment:cs', { options: { ctx: csCtx } });
};