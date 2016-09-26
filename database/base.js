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

function getOnDelete(database, onDelete) {
  switch (database) {
    case 'mssql': //: NO ACTION | CASCADE | SET NULL | SET DEFAULT
      if (onDelete === 'clearvalue') {
        return 'SET NULL';
      } else if (onDelete === 'cascade') {
        return 'CASCADE';
      }
      return null; // dontallow
  }
  return null;
}

Generator.prototype.createFiles = function createFiles() {
  debug('Defining database');
  var ctx = this.options.ctx;
  var ctxName = ctx.name;
  var schemaName = ctx.schemaName;
  var schemaFolder = schemaName || 'dbo';
  var database = this.options.database || 'mssql';

  // build content
  var t = [];
  t.push({ uuid: { name: ctxName + 'Id' }, notNullable: true, defaultTo: 'NEWID()', primary: ctxName + 'Id' });
  t.push({ datetime: { name: 'CreatedOn' }, notNullable: true });
  t.push({ uuid: { name: 'CreatedBy' }, notNullable: true });
  t.push({ datetime: { name: 'ModifiedOn' }, notNullable: true });
  t.push({ uuid: { name: 'ModifiedBy' }, notNullable: true });
  if (ctx.hasOwnProperty('recordTypes')) {
    t.push({ string: { name: 'RecordType', length: 160 }, notNullable: true });
  }
  _.forEach(ctx.getFields(2), function (x) {
    var maxlength;
    var defaultValue;
    var relatedTo;
    var onDelete;
    if (x.hasOwnProperty('autoNumber')) {
      // notimplemented
    } else if (x.hasOwnProperty('formula')) {
      // notimplemented
    } else if (x.hasOwnProperty('rollupSummary')) {
      // notimplemented
    } else if (x.hasOwnProperty('lookup')) {
      relatedTo = x.lookup.relatedTo;
      onDelete = getOnDelete(database, x.lookup.onDelete);
      t.push({ uuid: { name: x.Id }, on: relatedTo[0] + relatedTo[1], references: relatedTo[1] + 'Id', onDelete: onDelete });
    } else if (x.hasOwnProperty('masterDetail')) {
      relatedTo = x.masterDetail.relatedTo;
      onDelete = getOnDelete(database, 'cascade');
      t.push({ uuid: { name: x.Id }, on: relatedTo[0] + relatedTo[1], references: relatedTo[1] + 'Id', onDelete: onDelete });
    } else if (x.hasOwnProperty('externalLookup')) {
      t.push({ string: { name: x.Id } });
    } else if (x.hasOwnProperty('checkbox')) {
      defaultValue = x.checkbox.defaultValue;
      t.push({ boolean: { name: x.Id } });
    } else if (x.hasOwnProperty('currency')) {
      t.push({ decimal: { name: x.Id, precision: 18, scale: 4 } });
    } else if (x.hasOwnProperty('date')) {
      t.push({ date: { name: x.Id } });
    } else if (x.hasOwnProperty('dateTime')) {
      t.push({ datetime: { name: x.Id } });
    } else if (x.hasOwnProperty('email')) {
      t.push({ string: { name: x.Id } });
    } else if (x.hasOwnProperty('geolocation')) {
      // notimplemented
    } else if (x.hasOwnProperty('number')) {
      var precision = x.number.precision || 18;
      var scale = x.number.scale || 0;
      if (scale === 0) {
        t.push({ integer: { name: x.Id } });
      } else {
        t.push({ decimal: { name: x.Id, precision: precision, scale: scale } });
      }
    } else if (x.hasOwnProperty('percent')) {
      var scale2 = x.number.scale || 0;
      t.push({ decimal: { name: x.Id, precision: 18, scale: scale2 } });
    } else if (x.hasOwnProperty('phone')) {
      t.push({ string: { name: x.Id } });
    } else if (x.hasOwnProperty('picklist')) {
      t.push({ string: { name: x.Id } });
    } else if (x.hasOwnProperty('picklistMulti')) {
      t.push({ string: { name: x.Id } });
    } else if (x.hasOwnProperty('text')) {
      maxlength = x.text.length;
      t.push({ string: { name: x.Id, length: maxlength } });
    } else if (x.hasOwnProperty('textArea')) {
      maxlength = x.textArea.length;
      t.push({ string: { name: x.Id, length: maxlength } });
    } else if (x.hasOwnProperty('textAreaLong')) {
      maxlength = x.textAreaLong.length;
      t.push({ string: { name: x.Id, length: maxlength } });
    } else if (x.hasOwnProperty('textAreaRich')) {
      maxlength = x.textAreaRich.length;
      t.push({ string: { name: x.Id, length: maxlength } });
    } else if (x.hasOwnProperty('textEncrypted')) {
      maxlength = x.textEncrypted.length;
      t.push({ string: { name: x.Id, length: maxlength } });
    } else if (x.hasOwnProperty('url')) {
      t.push({ string: { name: x.Id } });
    } else {
      this.log(chalk.bold('ERR! ' + chalk.green(ctxName + '.' + x.name + ': { field.x: }') + ' not matched'));
      return null;
    }
  }.bind(this));

  var location = this.location || new Location();
  var sqlCtx = {
    _name: ctxName,
    _file: location.getEnsuredPath(schemaFolder + '/Tables', ctxName + '.sql'),
    _client: database,
    createTable: { schemaName: schemaName, createTable: ctxName, t: t }
  };
  if (ctx.hasOwnProperty('relations')) {
    var children = sqlCtx._children = [];
    _.forEach(ctx.relations, function (x) {
      var name = x.name;
      var relatedTo = x.relatedTo;
      var onDelete = getOnDelete(database, x.onDelete || 'cascade');
      var t = [];
      t.push({ uuid: { name: ctxName + 'Id' }, on: ctxName, references: ctxName + 'Id', onDelete: 'CASCADE' });
      t.push({ uuid: { name: name + 'Id' }, on: relatedTo[0] + relatedTo[1], references: relatedTo[1] + 'Id', onDelete: onDelete });
      t.push({ primary: [ctxName + 'Id', name + 'Id'] });
      children.push({
        _name: ctxName + '_' + name,
        _file: location.getEnsuredPath(schemaFolder + '/Tables', ctxName + '_' + name + '.sql'),
        createTable: { schemaName: schemaName, createTable: ctxName + '_' + name, t: t }
      });
    });
  }
  // console.log(sqlCtx);
  this.composeWith('fragment:sql', { options: { ctx: sqlCtx } });
};