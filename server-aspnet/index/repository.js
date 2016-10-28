/*
 * generator-xrm
 * https://github.com/BclEx/generator-xrm
 *
 * Copyright (c) 2015 Sky Morey, contributors
 * Licensed under the MIT license.
 */

'use strict';
// jshint multistr: true

// External libs.
var _ = require('lodash');
var fs = require('fs');
var knex = require('knex');
var helpers = require('../helpers');

function q(s, ctx, a0, a1, a2) {
    var camelCase = _.camelCase(ctx.name);
    return s.replace(/\$\{Name\}/g, ctx.name)
        .replace(/\$\{name\}/g, camelCase)
        .replace(/'/g, '"')
        .replace(/\$\{0\}/g, a0).replace(/\$\{1\}/g, a1).replace(/\$\{2\}/g, a2);
}

function build(s, template, ctx, database) {
    // jshint validthis:true
    var ctxName = ctx.name;
    var t0 = s;
    var $ = knex({ client: database, formatting: true });

    // getAllSql
    var elms1 = [ctx.Id];
    var list = ctx.lists['Main'];
    if (!list) {
        ctx.missingList('Main', 'aspnet-repository');
        return;
    }
    _.forOwn(list.l, function (value, key) {
        var field = ctx.fields[key];
        if (!field) {
            ctx.missingField(key, 'aspnet-repository');
            return;
        }
        elms1.push(field.Id); // + ' as ' + field.name);
        if (field.relate) {
            elms1.push(field.Id + 'Name');
        }
    });
    var getAllSql = $.select(elms1).from(ctxName + 'View').toQuery();

    // getByIdSql
    var elms2 = [ctx.Id];
    _.forEach(ctx.getFields(3), function (field) {
        elms2.push(field.Id); // + ' as ' + field.name);
        if (field.relate) {
            elms2.push(field.Id + 'Name');
        }
    });
    var getByIdSql = $.select(elms2).from(ctxName + 'View').whereRaw(ctxName + 'Id = @' + ctxName + 'Id').toQuery();

    var body = fs.readFileSync(template.getTemplatePath('repository.cs'), 'utf8');
    t0.push(function (selector, $) {
        $.body.append(q(body, ctx, getAllSql, getByIdSql));
    }.bind(this));
}

module.exports = {
    build: build,
};
