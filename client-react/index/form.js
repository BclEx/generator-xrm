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
        .replace(/\$\{names\}/g, camelCase + 's');
}

function build(s, theme, ctx) {
    // jshint validthis:true
    var t0 = s[0];
    t0.push(function (selector, $) {
        var layout = ctx.layouts['Main'];
        if (!layout) {
            ctx.missingLayout('Main', 'react-layout');
            return;
        }
        var h = [[]];
        theme.buildLayout(h, false, layout.pack);
        var layoutHtml = h[0].join('');
        // console.log(layoutHtml);
        var render = 'return (\n\
<div className="slds-form--stacked slds-grid slds-wrap slds-m-top--large">\n\
' + layoutHtml + '\
    <div className="slds-col--padded slds-m-top--medium slds-size--1-of-1">\n\
        <button className="slds-button slds-button--brand" onClick={this.save}>Save</button>\n\
    </div>\n\
</div>)';
        $.body.append(q("\
import React from 'react';\n\
import LinkedStateMixin from 'react-addons-linked-state-mixin';\n\
\n\
export default React.createClass({\n\
    mixins: [LinkedStateMixin],\n\
    getInitialState() {\n\
        let entity = this.props.entity;\n\
        " + $.verbatim('return {...entity};') + "\n\
    },\n\
    componentWillReceiveProps(props) {\n\
        let entity = props.entity;\n\
        " + $.verbatim('this.setState({...entity});') + "\n\
    },\n\
    save() {\n\
        this.props.saveHandler(this.state);\n\
    },\n\
    render() {" + render + "}\n\
});", ctx));
    }.bind(this));
}

module.exports = {
    build: build,
};
