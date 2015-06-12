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
var chalk = require('chalk');

var Generator = module.exports = function Generator() {
  scriptBase.apply(this, arguments);
};

util.inherits(Generator, scriptBase);

Generator.prototype.createKnexFiles = function () {
  this.log(chalk.green('Building knex...'));
  var ctx = this.options.ctx;
  if (!Array.isArray(ctx.fields)) {
    this.log(chalk.red('ERR! { fields: not array }')); return null;
  }

  var entityName = ctx.name || 'entity';
  var ddl0 = "return knex.schema.createTable('" + entityName + "', function (t) {\
t.increments('"+ entityName + "Id').notNullable().primary('" + entityName + "Id');\
t.datetime('CreateOn').notNullable();\
t.uuid('CreateBy').notNullable();\
t.datetime('ModifyOn').notNullable();\
t.uuid('ModifyBy').notNullable();\
";
  ctx.fields.forEach(function (prop) {
    var propName = prop.name;
    if (!propName) {
      this.log(chalk.red('ERR! { field.propName: not defined }')); return null;
    }
    var maxlength;
    if (prop.text) {
      maxlength = prop.text.maxlength;
      ddl0 += "t.string('" + propName + "', " + maxlength + ");";
    } else if (prop.memo) {
      maxlength = prop.memo.maxlength;
      ddl0 += "t.string('" + propName + "', " + maxlength + ");";
    } else if (prop.lookup) {
      var lookupEntity = prop.lookup.entity;
      ddl0 += "t.uuid('" + propName + "Id').references('" + lookupEntity + "." + lookupEntity + "Id').onDelete('CASCADE');";
    } else if (prop.picklist) {
      ddl0 += "t.string('" + propName + "', -1);";
    } else if (prop.date) {
      ddl0 += "t.dateTime('" + propName + "', -1);";
    } else if (prop.decimal) {
      ddl0 += "t.decimal('" + propName + "', 18, 4);";
    } else if (prop.currency) {
      ddl0 += "t.decimal('" + propName + "', 18, 4);";
    } else {
      this.log(chalk.red('ERR! { field.propName: not defined }')); return null;
    }
  });

};

