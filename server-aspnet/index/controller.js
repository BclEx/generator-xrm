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

function q(s, ctx) {
    var camelCase = _.camelCase(ctx.name);
    return s.replace(/\$\{Name\}/g, ctx.name)
        .replace(/\$\{name\}/g, camelCase)
        .replace(/'/g, '"');
}

function build(s, template, ctx) {
    // jshint validthis:true
    var t0 = s;
    var fs = require('fs');
 
    var body = fs.readFileSync(template.getTemplatePath('controller.cs'), 'utf8');
    t0.push(function (selector, $) {
        $.body.append(q(body, ctx));
    }.bind(this));
}

module.exports = {
    build: build,
};
