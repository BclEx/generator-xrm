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
<section className="stage" style={{top:\'90px\',height:\'calc(100% - 90px)\',width:\'100%\'}}>\n\
    <RecordHeader type="Entity" icon="account" title={this.state.entity.name}\n\
        onEdit={this.editHandler}\n\
        onDelete={this.deleteHandler}\n\
        onClone={this.cloneHandler}>\n\
        <HeaderField label="Date Listed" value="Aug 1st 2015"/>\n\
    </RecordHeader>\n\
    {React.cloneElement(this.props.children, { entity: this.state.entity, saveHandler: this.saveHandler})}\n\
</section>)';
// <HeaderField label="City" value={this.state.entity.city}/>\n\
// <HeaderField label="Type" value="Single Family"/>\n\
// <HeaderField label="Date Listed" value="Aug 1st 2015"/>\n\
// <HeaderField label="Asking Price" value={this.state.entity.price} format="currency"/>\n\
        $.body.append(q("\
import React from 'react';\n\
import {Router} from 'react-router';\n\
import * as ${name}Service from '../_services/${Name}Service';\n\
import {RecordHeader, HeaderField} from '../_components/PageHeader';\n\
export default React.createClass({\n\
    getInitialState() {\n\
        return { entity: {} };\n\
    },\n\
    componentDidMount() {\n\
        let id = this.props.params.${id};\n\
        ${name}Service.findById(id).then(entity => this.setState({entity}));\n\
    },\n\
    saveHandler(entity) {\n\
        ${name}Service.updateItem(entity).then(() => {\n\
            console.log('entity saved');\n\
        });\n\
    },\n\
    editHandler() {\n\
        window.location.hash = '#${name}/' + this.state.entity.${id} + '/edit';\n\
    },\n\
    deleteHandler() {\n\
        ${name}Service.deleteItem(this.state.entity.${id}).then(() => {\n\
            window.location.hash = '#${names}';\n\
        });\n\
    },\n\
    cloneHandler() {\n\
    },\n\
    render() {" + $.verbatim(q(render, ctx)) + "}\n\
});", ctx));
    }.bind(this));
}

module.exports = {
  build: build,
};
