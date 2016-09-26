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
    return s.replace(/\$\{Name\}/g, ctx.name).replace(/\$\{name\}/g, camelCase).replace(/\$\{names\}/g, camelCase + 's');
}

function build(s, theme, ctx) {
    // jshint validthis:true
    var t0 = s[0];
    t0.push(function (selector, $) {
        $.body.append(q("\
import * as h from '../_lib/h';\n\
let url = 'api/${Name}';\n\
export let findAll = sort => h.get(url, {sort});\n\
export let findByName = name => h.get(url, {name});\n\
export let findById = id => h.get(url + '/' + id);\n\
export let updateItem = property => h.put(url, property);\n\
export let createItem = property => h.post(url, property);\n\
export let deleteItem = id => h.del(url + '/' + id);\n\
", ctx));
    }.bind(this));
}

module.exports = {
  build: build,
};
