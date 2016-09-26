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

function build(database, ctx, schemaName) {
  // jshint validthis:true
  var ctxName = ctx.name;
  return function ($) {
    // build content
    var v = $.from(schemaName + '.' + ctxName);
    var t = [ctxName + '.*'];
    _.forEach(ctx.getFields(3), function (x) {
      var relatedTo;
      if (x.hasOwnProperty('lookup') || x.hasOwnProperty('masterDetail')) {
        relatedTo = (x.hasOwnProperty('lookup') ? x.lookup.relatedTo : x.masterDetail.relatedTo);
        var displayName = 'Name';
        var relatedToCtx = ctx.getCtx(relatedTo[0] + relatedTo[1]);
        if (relatedToCtx) {
          var displayField = relatedToCtx.getDisplayField();
          displayName = (displayField ? displayField.name : 'Name');
        }
        var alias = '_' + x.Id;
        t.push(alias + '.' + displayName + ' as ' + x.Id + 'Name');
        v = v.leftJoin(relatedTo[0] + relatedTo[1] + ' as ' + alias, function () {
          this.on(ctxName + '.' + x.Id, '=', alias + '.' + relatedTo[1] + 'Id');
        });
      }
    }.bind(this));
    return v.select(t);
  };
}

// var viewDefinition = $.from('users').leftJoin('accounts', function () {
//   this.on('accounts.id', '=', 'users.account_id').orOn('accounts.owner_id', '=', 'users.id')
// });

module.exports = {
  build: build,
};