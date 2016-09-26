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

function build(database, ctx, x) {
  // jshint validthis:true
  var ctxName = ctx.name;

  // build content
  var name = x.name;
  var relatedTo = x.relatedTo;
  var onDelete = getOnDelete(database, x.onDelete || 'cascade');
  var t = [];
  t.push({ uuid: { name: ctxName + 'Id' }, on: ctxName, references: ctxName + 'Id', onDelete: 'CASCADE' });
  t.push({ uuid: { name: name + 'Id' }, on: relatedTo[0] + relatedTo[1], references: relatedTo[1] + 'Id', onDelete: onDelete });
  t.push({ primary: [ctxName + 'Id', name + 'Id'] });
  return t;
}

module.exports = {
    build: build,
};