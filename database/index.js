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
    t.push({ string: { name: 'RecordType' }, notNullable: true });
  }
  fields.forEach(function (prop) {

    var propName = prop.name;
    if (!propName) {
      this.log(chalk.bold('ERR! ' + chalk.green(entityName + '.' + propName + ': { field.name: }') + ' not defined')); return null;
    }
    var maxlength;
    var defaultValue;
    var relatedTo;
    if (prop.hasOwnProperty('autoNumber')) {
      // notimplemented
    } else if (prop.hasOwnProperty('formula')) {
      // notimplemented
    } else if (prop.hasOwnProperty('rollupSummary')) {
      // notimplemented
    } else if (prop.hasOwnProperty('lookup')) {
      relatedTo = prop.lookup.relatedTo;
      t.push({ uuid: { name: propName + 'Id' }, references: relatedTo + '.' + relatedTo + 'Id', onDelete: 'CASCADE' });
    } else if (prop.hasOwnProperty('masterDetail')) {
      relatedTo = prop.masterDetail.relatedTo;
      t.push({ uuid: { name: propName + 'Id' }, references: relatedTo + '.' + relatedTo + 'Id', onDelete: 'CASCADE' });
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
    _file: location.getEnsuredPath('dbo/Tables', entityName + '.sql'),
    _client: 'mssql',
    createTable: { createTable: entityName, t: t }
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
      var t = [];
      t.push({ uuid: { name: entityName + 'Id' }, references: entityName + '.' + entityName + 'Id', onDelete: 'CASCADE' });
      t.push({ uuid: { name: propName + 'Id' }, references: relatedTo + '.' + relatedTo + 'Id', onDelete: 'CASCADE' });
      children.push({
        _name: entityName + '_' + propName,
        _file: location.getEnsuredPath('dbo/Tables', entityName + '_' + propName + '.sql'),
        createTable: { createTable: entityName + '_' + propName, t: t }
      });
    });
  }
  // console.log(sqlCtx);
  this.composeWith('fragment:sql', { options: { ctx: sqlCtx } });
};
