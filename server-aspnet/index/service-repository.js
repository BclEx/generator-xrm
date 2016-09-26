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
var knex = require('knex');
var helpers = require('../helpers');

function q(s, ctx, a0, a1, a2) {
    var camelCase = _.camelCase(ctx.name);
    return s.replace(/\$\{Name\}/g, ctx.name).replace(/\$\{name\}/g, camelCase).replace(/'/g, '"')
        .replace(/\$\{0\}/g, a0).replace(/\$\{1\}/g, a1).replace(/\$\{2\}/g, a2);
}

function build(s, ctx, database) {
    // jshint validthis:true
    var ctxName = ctx.name;
    var t0 = s;
    var $ = knex({ client: database, formatting: true });

    // deleteByIdSql
    var deleteByIdSql = $(ctxName).whereRaw(ctxName + 'Id = @' + ctxName + 'Id').del().toQuery();

    t0.push(function (selector, $) {
        $.body.append(q("\
using System;\n\
using System.Linq;\n\
using System.Collections.Generic;\n\
using Dapper;\n\
\n\
namespace CORE.Site\n\
{\n\
    public interface I${Name}ServiceRepository\n\
    {\n\
        bool DeleteById(Guid id);\n\
    }\n\
\n\
    public class ${Name}ServiceRepository : I${Name}ServiceRepository\n\
    {\n\
        readonly IStorageService _storageService;\n\
\n\
        public ${Name}ServiceRepository(IStorageService storageService)\n\
        {\n\
            _storageService = storageService;\n\
        }\n\
        \n\
        public bool DeleteById(Guid id)\n\
        {\n\
            using (var ctx = _storageService.GetConnection())\n\
                return (ctx.Execute('${0}', new { ${Name}Id = id }) > 0);\n\
        }\n\
    }\n\
}", ctx, deleteByIdSql));
    }.bind(this));
}

module.exports = {
    build: build,
};
