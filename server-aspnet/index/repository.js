/*
 * generator-xrm
 * https://github.com/BclEx/generator-xrm
 *
 * Copyright (c) 2015 Sky Morey, contributors
 * Licensed under the MIT license.
 */

'use strict';

// External libs.
var _ = require('lodash');
var knex = require('knex');
var helpers = require('../helpers');

function q(s, ctx, a0, a1, a2) {
    var camelCase = _.camelCase(ctx.name);
    return s.replace(/\$\{Name\}/g, ctx.name).replace(/\$\{name\}/g, camelCase).replace(/'/g, '"')
        .replace(/\$\{0\}/g, a0).replace(/\$\{1\}/g, a1).replace(/\$\{2\}/g, a2);
}

function build(s, ctx, database) {
    var ctxName = ctx.name;
    var t0 = s;
    var $ = knex({ client: database, formatting: true });

    // getAllSql
    var elms1 = [ctx.Id];
    var list = ctx.lists['Main'];
    if (!list) {
        ctx.missingList('Main');
        return;
    }
    _.forOwn(list.l, function (value, key) {
        var field = ctx.fields[key];
        if (!field) {
            ctx.missingField(key);
            return;
        }
        elms1.push(field.Id + ' as ' + field.name)
    });
    var getAllSql = $.select(elms1).from(ctxName).toQuery();

    // getByIdSql
    var elms2 = [ctx.Id];
    _.forEach(ctx.getFields(3), function (field) {
        elms2.push(field.Id + ' as ' + field.name)
    });
    var getByIdSql = $.select(elms2).from(ctxName).whereRaw(ctxName + 'Id = @' + ctxName + 'Id').toQuery();

    t0.push(function (selector, $) {
        $.body.append(q("\
using System;\n\
using System.Linq;\n\
using System.Collections.Generic;\n\
using Dapper;\n\
\n\
namespace CORE.Site\n\
{\n\
    public interface I${Name}Repository\n\
    {\n\
        IEnumerable<${Name}Model> GetAll();\n\
        ${Name}Model GetById(Guid id);\n\
    }\n\
\n\
    public class ${Name}Repository : I${Name}Repository\n\
    {\n\
        readonly IStorageService _storageService;\n\
\n\
        public ${Name}Repository(IStorageService storageService)\n\
        {\n\
            _storageService = storageService;\n\
        }\n\
\n\
        public IEnumerable<${Name}Model> GetAll()\n\
        {\n\
            using (var ctx = _storageService.GetConnection())\n\
                foreach (var i in ctx.Query<${Name}Model>('${0}', new { }))\n\
                    yield return i;\n\
        }\n\
\n\
        public ${Name}Model GetById(Guid id)\n\
        {\n\
            using (var ctx = _storageService.GetConnection())\n\
                return ctx.Query<${Name}Model>('${1}', new { ${Name}Id = id })\n\
                    .SingleOrDefault();\n\
        }\n\
    }\n\
}", ctx, getAllSql, getByIdSql));
    }.bind(this));
}

module.exports = {
    build: build,
};
