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
        var render = 'return (\n\
<div>\n\
    <RecordHeader type="Property" icon="account" title={this.state.property.address}\n\
        onEdit={this.editHandler}\n\
        onDelete={this.deleteHandler}\n\
        onClone={this.cloneHandler}>\n\
        <HeaderField label="City" value={this.state.property.city}/>\n\
        <HeaderField label="Type" value="Single Family"/>\n\
        <HeaderField label="Date Listed" value="Aug 1st 2015"/>\n\
        <HeaderField label="Asking Price" value={this.state.property.price} format="currency"/>\n\
    </RecordHeader>\n\
    {React.cloneElement(this.props.children, { property: this.state.property, saveHandler: this.saveHandler})}\n\
</div>)';
        $.body.append(q("\
import React from 'react';\n\
import {Router} from 'react-router';\n\
import * as ${name}Service from '../_services/${Name}Service';\n\
import {RecordHeader, HeaderField} from '../_components/PageHeader';\n\
export default React.createClass({\n\
    getInitialState() {\n\
        return { property: {} };\n\
    },\n\
    componentDidMount() {\n\
        propertyService.findById(this.props.params.propertyId).then(x => this.setState({x}));\n\
    },\n\
    saveHandler(property) {\n\
        propertyService.updateItem(property).then(() => {\n\
            console.log('property saved');\n\
        });\n\
    },\n\
    editHandler() {\n\
        window.location.hash = '#property/' + this.state.property.property_id + '/edit';\n\
    },\n\
    deleteHandler() {\n\
        propertyService.deleteItem(this.state.property.property_id).then(() => {\n\
            window.location.hash = '#';\n\
        });\n\
    },\n\
    render() {" + $.verbatim(q(render, ctx)) + "}\n\
});", ctx));
    }.bind(this));
}

module.exports = {
  build: build,
};
