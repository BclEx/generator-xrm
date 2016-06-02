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
<div>\n\
    <HomeHeader type="${names}"\n\
                title="My ${Name}"\n\
                newLabel="New ${Name}"\n\
                actions={[{value:"new", label:"New ${Name}"}]}\n\
                itemCount={this.state.${names}.length}\n\
                viewOptions={[{value:"table", label:"Table", icon:"table"},{value:"tiles", label:"Tiles", icon:"location"}]}\n\
                sortOptions={[{value:"address", label:"Address"},{value:"city", label:"City"},{value:"price", label:"Price"}]}\n\
                onNew={this.newHandler}\n\
                onSort={this.sortHandler}\n\
                onViewChange={this.viewChangeHandler}/>\n\
    <${Name}List ${names}={this.state.${names}} onSort={this.sortHandler} onDelete={this.deleteHandler} onEdit={this.editHandler}/>\n\
    {this.state.adding ? <New${Name}Window onSave={this.saveHandler} onCancel={this.cancelHandler}/> : ""}\n\
</div>)';
        $.body.append(q("\
import React from 'react';\n\
import * as ${name}Service from '../_services/${Name}Service';\n\
import {HomeHeader} from '../_components/PageHeader';\n\
import ${Name}List from './${Name}List'; \
import New${Name}Window from './New${Name}Window';\n\
export default React.createClass({\n\
    getInitialState() {\n\
        return {view: 'grid', sort: '', ${names}: []};\n\
    },\n\
    componentDidMount() {\n\
        ${name}Service.findAll(this.state.sort).then(${names} => this.setState({${names}}));\n\
    },\n\
    sortHandler(sort) {\n\
        ${name}Service.findAll(sort).then(${names} => {\n\
            this.setState({sort, ${names}})\n\
        });\n\
    },\n\
    newHandler() {\n\
        this.setState({adding: true});\n\
    },\n\
    deleteHandler(data) {\n\
        ${name}Service.deleteItem(data.id).then(() => {\n\
            ${name}Service.findAll(this.state.sort).then(${names} => this.setState({${names}}));\n\
        });\n\
    },\n\
    editHandler(data) {\n\
        window.location.hash = '#${name}/' + data.id + '/edit\';\n\
    },\n\
    viewChangeHandler(value) {\n\
        this.setState({view: value});\n\
    },\n\
    saveHandler(data) {\n\
        ${name}Service.createItem(data).then(() => {\n\
            ${name}Service.findAll(this.state.sort).then(${names} => this.setState({adding: false, ${names}}));\n\
        });\n\
    },\n\
    cancelHandler() {\n\
        this.setState({adding: false});\n\
    },\n\
    render() {" + $.verbatim(q(render, ctx)) + "}\n\
});", ctx));
    }.bind(this));
}

module.exports = {
  build: build,
};
