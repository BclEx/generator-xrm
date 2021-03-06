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
        .replace(/\$\{names\}/g, camelCase + 's')
        .replace(/\$\{id\}/g, ctx.id);
}

function build(s, theme, ctx) {
    // jshint validthis:true
    var t0 = s[0];
    t0.push(function (selector, $) {
        var render = 'return (\n\
<Lookup label="Select a contact"\n\
    searchKey={this.state.searchKey}\n\
    items={this.state.items}\n\
    dataField="${id}"\n\
    labelField="name"\n\
    onSearchKeyChange={this.searchKeyChangeHandler}\n\
    onChange={this.props.onChange} />)';
        $.body.append(q("\
import React from 'react';\n\
import * as ${name}Service from '../_services/${Name}Service';\n\
import Lookup from '../_components/Lookup';\n\
export default React.createClass({\n\
    getInitialState() {\n\
        return {\n\
            searchKey: undefined,\n\
            items: []\n\
        };\n\
    },\n\
    searchKeyChangeHandler(key) {\n\
        ${name}Service.findByName(key).then(x => this.setState({searchKey: key, items: x}));\n\
    },\n\
    render() {" + $.verbatim(q(render, ctx)) + "}\n\
});", ctx));
    }.bind(this));
}

module.exports = {
  build: build,
};
