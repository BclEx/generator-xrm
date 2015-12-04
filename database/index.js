/*
 * generator-xrm
 * https://github.com/BclEx/generator-fragment
 *
 * Copyright (c) 2015 Sky Morey, contributors
 * Licensed under the MIT license.
 */

'use strict';

// External libs.
var util = require('util');
var scriptBase = require('../script-base.js');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var _ = require('lodash');

var Generator = module.exports = function Generator() {
  scriptBase.apply(this, arguments);
};

util.inherits(Generator, scriptBase);

Generator.prototype.createFiles = function createFiles() {
  this.log(chalk.green('define sql...'));
  var ctx = this.options.ctx;

  // test ctx
  var entityName = ctx.name || 'entity';
  var fields = ctx.fields;
  if (!Array.isArray(fields)) {
    this.log(chalk.red('ERR! { fields: not array }')); return null;
  }

  // build content
  var t = [];
  t.push({ uuid: { name: entityName + 'Id' }, notNullable: true, defaultTo: 'NEWID()', primary: entityName + 'Id' });
  t.push({ datetime: { name: 'CreateOn' }, notNullable: true });
  t.push({ uuid: { name: 'CreateBy' }, notNullable: true });
  t.push({ datetime: { name: 'ModifyOn' }, notNullable: true });
  t.push({ uuid: { name: 'ModifyBy' }, notNullable: true });
  fields.forEach(function (prop) {
    var propName = prop.name;
    if (!propName) {
      this.log(chalk.red('ERR! { field.propName: not defined }')); return null;
    }
    var maxlength;
    if (prop.hasOwnProperty('text')) {
      maxlength = prop.text.maxlength;
      t.push({ string: { name: propName, length: maxlength } });
    } else if (prop.hasOwnProperty('memo')) {
      maxlength = prop.memo.maxlength;
      t.push({ string: { name: propName, length: maxlength } });
    } else if (prop.hasOwnProperty('lookup')) {
      var lookupEntity = prop.lookup.entity;
      t.push({ uuid: { name: propName + 'Id' }, references: lookupEntity + '.' + lookupEntity + 'Id', onDelete: 'CASCADE' });
    } else if (prop.hasOwnProperty('picklist')) {
      t.push({ string: { name: propName } });
    } else if (prop.hasOwnProperty('date')) {
      t.push({ dateTime: { name: propName } });
    } else if (prop.hasOwnProperty('decimal')) {
      t.push({ decimal: { name: propName, precision: 18, scale: 4 } });
    } else if (prop.hasOwnProperty('currency')) {
      t.push({ decimal: { name: propName, precision: 18, scale: 4 } });
    } else {
      this.log(chalk.red('ERR! { field.propName: not defined }')); return null;
    }
  });

  var opts = { ctx: { createTable: entityName, t: t } };
  this.composeWith('fragment:sql', { options: opts });
};

// Generator.prototype.createFiles2 = function createFiles2() {
//   this.log(chalk.green('Building sql2...'));
//   var ctx = this.options.ctx;
//   var entityName = ctx.name || 'entity';
//   var fields = ctx.fields;
//   if (!Array.isArray(fields)) {
//     this.log(chalk.red('ERR! { fields: not array }')); return null;
//   }
// 
//   var ddl0 = "return knex.schema.createTable('" + entityName + "', function (t) {\
// t.increments('"+ entityName + "Id').notNullable().primary('" + entityName + "Id');\
// t.datetime('CreateOn').notNullable();\
// t.uuid('CreateBy').notNullable();\
// t.datetime('ModifyOn').notNullable();\
// t.uuid('ModifyBy').notNullable();\
// ";
//   fields.forEach(function (prop) {
//     var propName = prop.name;
//     if (!propName) {
//       this.log(chalk.red('ERR! { field.propName: not defined }')); return null;
//     }
//     var maxlength;
//     if (prop.text) {
//       maxlength = prop.text.maxlength;
//       ddl0 += "t.string('" + propName + "', " + maxlength + ");";
//     } else if (prop.memo) {
//       maxlength = prop.memo.maxlength;
//       ddl0 += "t.string('" + propName + "', " + maxlength + ");";
//     } else if (prop.lookup) {
//       var lookupEntity = prop.lookup.entity;
//       ddl0 += "t.uuid('" + propName + "Id').references('" + lookupEntity + "." + lookupEntity + "Id').onDelete('CASCADE');";
//     } else if (prop.picklist) {
//       ddl0 += "t.string('" + propName + "', -1);";
//     } else if (prop.date) {
//       ddl0 += "t.dateTime('" + propName + "', -1);";
//     } else if (prop.decimal) {
//       ddl0 += "t.decimal('" + propName + "', 18, 4);";
//     } else if (prop.currency) {
//       ddl0 += "t.decimal('" + propName + "', 18, 4);";
//     } else {
//       this.log(chalk.red('ERR! { field.propName: not defined }')); return null;
//     }
//   });
//   return ddl0;
// };
