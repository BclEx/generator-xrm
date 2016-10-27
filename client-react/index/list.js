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
var jsx = require('../../jsx');
var _ = require('lodash');
var chalk = require('chalk');

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
        var elms = [];
        var list = ctx.lists['Main'];
        if (!list) {
            ctx.missingList('Main', 'react-list');
            return;
        }
        _.forOwn(list.l, function (layout, key) {
            var field = ctx.fields[key];
            if (!field) {
                ctx.missingField(key, 'react-list');
                return;
            }
            var layout2 = _.assign(layout, field.defaultLayout);
            layout2.header = field.label;
            layout2.field = (!field.relate ? field.id : field.id + 'Name');
            if (layout2.sortable) {
                layout2.sortable = '{true}';
            }
            if (field.primary) {
                layout2.onLink = '{this.linkHandler}';
            }
            elms.push({ div: { _attr: layout2 } });
        });
        elms.push({ _attr: { data: '{this.props.${names}}', keyField: ctx.id, onSort: '{this.props.onSort}', onAction: '{this.actionHandler}' } });
        var render = 'return (\n\
' + jsx({ DataGrid: elms }) + ')';
        //         var render = 'return (\n\
        // <DataGrid data={this.props.${names}} keyField="id" onSort={this.props.onSort} onAction={this.actionHandler}>\n\
        //     <div header="Address" field="address" sortable={true} onLink={this.linkHandler}/>\n\
        //     <div header="City" field="city" sortable={true}/>\n\
        //     <div header="Bedrooms" field="bedrooms" textAlign="center"/>\n\
        //     <div header="Bathrooms" field="bathrooms" textAlign="center"/>\n\
        //     <div header="Price" field="price" sortable={true} textAlign="right" format="currency"/>\n\
        // </DataGrid>)';
        $.body.append(q("\
import React from 'react';\n\
import DataGrid from '../_components/DataGrid';\n\
export default React.createClass({\n\
    linkHandler(entity) {\n\
        window.location.hash = '#${name}/' + entity.${id};\n\
    },\n\
    actionHandler(data, value, label) {\n\
        if (label === 'Delete') {\n\
            this.props.onDelete(data);\n\
        } else if (label === 'Edit') {\n\
            this.props.onEdit(data);\n\
        }\n\
    },\n\
    render() {" + $.verbatim(q(render, ctx)) + "}\n\
});", ctx));
    }.bind(this));
}

module.exports = {
    build: build,
};
