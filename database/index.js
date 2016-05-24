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

Generator.prototype.createFiles = function createFiles() {
  debug('Defining database');
  var ctx = this.options.ctx;
  var schemaName = ctx.schemaName || '';
  var schemaFolder = schemaName || 'dbo';
  var client = 'mssql';

  // ctx
  var entityName = ctx.name || 'entity';
  var fields = ctx.fields;
  if (!Array.isArray(fields)) {
    this.log(chalk.bold('ERR! ' + chalk.green('{ fields: }') + ' not array')); return null;
  }

  // build content
  var t = [];
  t.push({ uuid: { name: entityName + 'Id' }, notNullable: true, defaultTo: 'NEWID()', primary: entityName + 'Id' });
  t.push({ datetime: { name: 'CreateOn' }, notNullable: true });
  t.push({ uuid: { name: 'CreateBy' }, notNullable: true });
  t.push({ datetime: { name: 'ModifyOn' }, notNullable: true });
  t.push({ uuid: { name: 'ModifyBy' }, notNullable: true });
  if (ctx.hasOwnProperty('recordTypes')) {
    t.push({ string: { name: 'RecordType', length: 160 }, notNullable: true });
  }
  fields.forEach(function (prop) {
    var propName = prop.name;
    if (!propName) {
      this.log(chalk.bold('ERR! ' + chalk.green(entityName + '.' + propName + ': { field.name: }') + ' not defined')); return null;
    }
    var maxlength;
    var defaultValue;
    var relatedTo;
    var onDelete;
    if (prop.hasOwnProperty('autoNumber')) {
      // notimplemented
    } else if (prop.hasOwnProperty('formula')) {
      // notimplemented
    } else if (prop.hasOwnProperty('rollupSummary')) {
      // notimplemented
    } else if (prop.hasOwnProperty('lookup')) {
      relatedTo = getObjectNameParts(schemaName, prop.lookup.relatedTo);
      onDelete = getOnDelete(client, prop.lookup.onDelete);
      t.push({ uuid: { name: propName + 'Id' }, on: relatedTo[0] + relatedTo[1], references: relatedTo[1] + 'Id', onDelete: onDelete });
    } else if (prop.hasOwnProperty('masterDetail')) {
      relatedTo = getObjectNameParts(schemaName, prop.masterDetail.relatedTo);
      onDelete = getOnDelete(client, 'cascade');
      t.push({ uuid: { name: propName + 'Id' }, on: relatedTo[0] + relatedTo[1], references: relatedTo[1] + 'Id', onDelete: onDelete });
    } else if (prop.hasOwnProperty('externalLookup')) {
      t.push({ string: { name: propName } });
    } else if (prop.hasOwnProperty('checkbox')) {
      defaultValue = prop.checkbox.defaultValue;
      t.push({ boolean: { name: propName } });
    } else if (prop.hasOwnProperty('currency')) {
      t.push({ decimal: { name: propName, precision: 18, scale: 4 } });
    } else if (prop.hasOwnProperty('date')) {
      t.push({ date: { name: propName } });
    } else if (prop.hasOwnProperty('dateTime')) {
      t.push({ datetime: { name: propName } });
    } else if (prop.hasOwnProperty('email')) {
      t.push({ string: { name: propName } });
    } else if (prop.hasOwnProperty('geolocation')) {
      // notimplemented
    } else if (prop.hasOwnProperty('number')) {
      var precision = prop.number.precision || 18;
      var scale = prop.number.scale || 0;
      if (scale == 0) {
        t.push({ integer: { name: propName } });
      } else {
        t.push({ decimal: { name: propName, precision: precision, scale: scale } });
      }
    } else if (prop.hasOwnProperty('percent')) {
      t.push({ decimal: { name: propName, precision: 18, scale: scale } });
    } else if (prop.hasOwnProperty('phone')) {
      t.push({ string: { name: propName } });
    } else if (prop.hasOwnProperty('picklist')) {
      t.push({ string: { name: propName } });
    } else if (prop.hasOwnProperty('picklistMulti')) {
      t.push({ string: { name: propName } });
    } else if (prop.hasOwnProperty('text')) {
      maxlength = prop.text.length;
      t.push({ string: { name: propName, length: maxlength } });
    } else if (prop.hasOwnProperty('textArea')) {
      maxlength = prop.textArea.length;
      t.push({ string: { name: propName, length: maxlength } });
    } else if (prop.hasOwnProperty('textAreaLong')) {
      maxlength = prop.textAreaLong.length;
      t.push({ string: { name: propName, length: maxlength } });
    } else if (prop.hasOwnProperty('textAreaRich')) {
      maxlength = prop.textAreaRich.length;
      t.push({ string: { name: propName, length: maxlength } });
    } else if (prop.hasOwnProperty('textEncrypted')) {
      maxlength = prop.textEncrypted.length;
      t.push({ string: { name: propName, length: maxlength } });
    } else if (prop.hasOwnProperty('url')) {
      t.push({ string: { name: propName } });
    } else {
      this.log(chalk.bold('ERR! ' + chalk.green(entityName + '.' + propName + ': { field.prop: }') + ' not matched')); return null;
    }
  }.bind(this));

  var location = this.location || new Location();
  var sqlCtx = {
    _name: entityName,
    _file: location.getEnsuredPath(schemaFolder + '/Tables', entityName + '.sql'),
    _client: client,
    createTable: { schemaName: schemaName, createTable: entityName, t: t }
  };
  if (ctx.hasOwnProperty('relations')) {
    var relations = ctx.relations;
    if (!Array.isArray(relations)) {
      this.log(chalk.bold('ERR! ' + chalk.green('{ relations: }') + ' not array')); return null;
    }
    var children = sqlCtx._children = [];
    relations.forEach(function (prop) {

      var propName = prop.name;
      if (!propName) {
        this.log(chalk.bold('ERR! ' + chalk.green(entityName + ': { relation.name: }') + ' not defined')); return null;
      }
      var relatedTo = prop.relatedTo;
      if (!relatedTo) {
        this.log(chalk.bold('ERR! ' + chalk.green(entityName + ': { relation.relatedTo: }') + ' not defined')); return null;
      }
      relatedTo = getObjectNameParts(schemaName, relatedTo);
      var onDelete = getOnDelete(client, prop.onDelete || 'cascade');
      var t = [];
      t.push({ uuid: { name: entityName + 'Id' }, on: entityName, references: entityName + 'Id', onDelete: 'CASCADE' });
      t.push({ uuid: { name: propName + 'Id' }, on: relatedTo[0] + relatedTo[1], references: relatedTo[1] + 'Id', onDelete: onDelete });
      t.push({ primary: [entityName + 'Id', propName + 'Id'] });
      children.push({
        _name: entityName + '_' + propName,
        _file: location.getEnsuredPath(schemaFolder + '/Tables', entityName + '_' + propName + '.sql'),
        createTable: { schemaName: schemaName, createTable: entityName + '_' + propName, t: t }
      });
    });
  }
  // console.log(sqlCtx);
  this.composeWith('fragment:sql', { options: { ctx: sqlCtx } });
};

function getOnDelete(client, onDelete) {
  switch (client) {
    case 'mssql': //: NO ACTION | CASCADE | SET NULL | SET DEFAULT
      if (onDelete == 'clearvalue') {
        return 'SET NULL';
      } else if (onDelete == 'cascade') {
        return 'CASCADE';
      }
      return null; // dontallow
  }
  return null;
}

function getObjectNameParts(schemaName, objectName) {
  var pieces = undefined;
  if (_.isString(objectName)) {
    pieces = objectName.split('.');
  }
  if (!pieces || pieces.length === 1) {
    return [schemaName + '.', pieces ? pieces[0] : objectName];
  }
  return [pieces[0] + '.', pieces[1]];
}