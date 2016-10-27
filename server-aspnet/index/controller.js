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

function q(s, ctx) {
    var camelCase = _.camelCase(ctx.name);
    return s.replace(/\$\{Name\}/g, ctx.name)
        .replace(/\$\{name\}/g, camelCase)
        .replace(/'/g, '"');
}

function build(s, ctx) {
    // jshint validthis:true
    var t0 = s;
    t0.push(function (selector, $) {
        $.body.append(q("\
using System;\n\
using System.Abstract;\n\
using System.Collections.Generic;\n\
using System.Linq;\n\
using System.Net;\n\
using System.Net.Http;\n\
using System.Web.Http;\n\
\n\
namespace CORE.Site\n\
{\n\
    public class ${Name}Controller : ApiController\n\
    {\n\
        readonly I${Name}Repository _${name}Repository;\n\
        readonly I${Name}ServiceRepository _${name}ServiceRepository;\n\
        \n\
        public ${Name}Controller() : this(ServiceLocator.Resolve<I${Name}Repository>(),\n\
            ServiceLocator.Resolve<I${Name}ServiceRepository>()) { }\n\
        public ${Name}Controller(I${Name}Repository ${name}Repository,\n\
            I${Name}ServiceRepository ${name}ServiceRepository)\n\
        {\n\
            _${name}Repository = ${name}Repository;\n\
            _${name}ServiceRepository = ${name}ServiceRepository;\n\
        }\n\
\n\
        // GET api/<controller>\n\
        public IEnumerable<${Name}Model> Get(string sort = null)\n\
        {\n\
            return _${name}Repository.GetAll();\n\
        }\n\
\n\
        // GET api/<controller>/5\n\
        public ${Name}Model Get(Guid id)\n\
        {\n\
            return _${name}Repository.GetById(id);\n\
        }\n\
\n\
        // POST api/<controller>\n\
        public void Post([FromBody]string value)\n\
        {\n\
        }\n\
\n\
        // PUT api/<controller>/5\n\
        public void Put(int id, [FromBody]string value)\n\
        {\n\
        }\n\
\n\
        // DELETE api/<controller>/5\n\
        public bool Delete(Guid id)\n\
        {\n\
            return _${name}ServiceRepository.DeleteById(id);\n\
        }\n\
    }\n\
};", ctx));
    }.bind(this));
}

module.exports = {
    build: build,
};
