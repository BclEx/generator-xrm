/*
 * generator-fragment
 * https://github.com/BclEx/generator-fragment
 *
 * Copyright (c) 2015 Sky Morey, contributors
 * Licensed under the MIT license.
 */

'use strict';

// External libs.
var util = require('util');
var scriptBase = require('../script-base.js');
var debug = require('debug')('generator:xrm');
var chalk = require('chalk');
var knexFunc = require('knex');
//global.req = require; // Used by mssql
//var knex_mssql = require('../_knex-mssql');
//knexFunc.Client = '../_knex-mssql/mssql'; // Add client to Knex

var Generator = module.exports = function Generator() {
  scriptBase.apply(this, arguments);
};

util.inherits(Generator, scriptBase);

Generator.prototype._createContent = function () {
  var ctx = this.options.ctx;
  if (typeof ctx.build != 'function') {
    this.log(chalk.red('ERR! { build: undefined }')); return null;
  }

  // process ctx
  var knex = null;
  try {
    knex = knexFunc({ client: ctx.client || 'mysql' });
  } catch (e) { this.log(chalk.bold(e)); return null; }
  var content = null;
  try {
    var promise = ctx.build(knex);
    content = promise.toString();
  } catch (e) { this.log(chalk.bold(e)); return null; }

  return content;
};

Generator.prototype.createKnexFiles = function createKnexFiles() {
  this.log(chalk.green('Building knex...'));

  // write content
  var content = this._createContent();
  this.dest.write('name.sql', content);
  this.log(content);
};
