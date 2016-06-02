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

function q(s, ctx) {
    var camelCase = _.camelCase(ctx.name);
    return s.replace(/\$\{Name\}/g, ctx.name).replace(/\$\{name\}/g, camelCase).replace(/\$\{names\}/g, camelCase + 's');
}

function build(s, theme, ctx) {
    var t0 = s[0];
    t0.push(function (selector, $) {
        var render = 'return (\n\
<QuickFind label="Select a property..."\n\
    searchKey={this.state.searchKey}\n\
    valueField="property_id"\n\
    labelField="address"\n\
    list={this.state.list}\n\
    onSearchKeyChange={this.searchKeyChangeHandler}\n\
    onChange={this.props.onChange}/>)';
        $.body.append(q("\
import React from 'react';\n\
import * as ${name}Service from '../_services/${Name}Service';\n\
import QuickFind from '../_components/QuickFind';\n\
export default React.createClass({\n\
    getInitialState() {\n\
        return {\n\
            searchKey: undefined,\n\
            list: []\n\
        };\n\
    },\n\
    searchKeyChangeHandler(key) {\n\
        ${name}Service.findByName(key).then(x => this.setState({searchKey: key, list: x}));\n\
    },\n\
    render() {" + $.verbatim(q(render, ctx)) + "}\n\
});", ctx));
    }.bind(this));
}

module.exports = {
  build: build,
};
