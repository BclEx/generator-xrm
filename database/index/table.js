/*
 * generator-xrm
 * https://github.com/BclEx/generator-xrm
 *
 * Copyright (c) 2015 Sky Morey, contributors
 * Licensed under the MIT license.
 */

'use strict';

// External libs.
var chalk = require('chalk');
var _ = require('lodash');

function build(database, ctx) {
  var ctxName = ctx.name;

  // build content
  var t = [];
  t.push({ uuid: { name: ctxName + 'Id' }, notNullable: true, defaultTo: 'NEWID()', primary: ctxName + 'Id' });
  t.push({ datetime: { name: 'CreatedOn' }, notNullable: true });
  t.push({ uuid: { name: 'CreatedById' }, notNullable: true });
  t.push({ datetime: { name: 'ModifiedOn' }, notNullable: true });
  t.push({ uuid: { name: 'ModifiedById' }, notNullable: true });
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
      if (scale == 0) {
        t.push({ integer: { name: x.Id } });
      } else {
        t.push({ decimal: { name: x.Id, precision: precision, scale: scale } });
      }
    } else if (x.hasOwnProperty('percent')) {
      t.push({ decimal: { name: x.Id, precision: 18, scale: scale } });
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
  return t;
};

function getOnDelete(database, onDelete) {
  switch (database) {
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

module.exports = {
    build: build,
};