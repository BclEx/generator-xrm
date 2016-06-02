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
<div className="slds-form--stacked slds-grid slds-wrap slds-m-top--large">\n\
    <div className="slds-col--padded slds-size--1-of-1 slds-medium-size--1-of-2">\n\
        <fieldset className="slds-form--compound slds-m-bottom--medium">\n\
            <legend className="slds-form-element__label">Address</legend>\n\
            <div className="form-element__group">\n\
                <div className="slds-form-element__row">\n\
                    <label className="slds-form-element__control slds-size--1-of-1">\n\
                        <small className="slds-form-element__helper">Street</small>\n\
                        <input className="slds-input" type="text" valueLink={this.linkState("address")}/>\n\
                    </label>\n\
                </div>\n\
                <div className="slds-form-element__row">\n\
                    <label className="slds-form-element__control slds-size--2-of-4">\n\
                        <small className="slds-form-element__helper">City</small>\n\
                        <input className="slds-input" type="text" valueLink={this.linkState("city")}/>\n\
                    </label>\n\
                    <label className="slds-form-element__control slds-size--1-of-4">\n\
                        <small className="slds-form-element__helper">State</small>\n\
                        <input className="slds-input" type="text" valueLink={this.linkState("state")}/>\n\
                    </label>\n\
                    <label className="slds-form-element__control slds-size--1-of-4">\n\
                        <small className="slds-form-element__helper">ZIP Code</small>\n\
                        <input className="slds-input" type="text" valueLink={this.linkState("zip")}/>\n\
                    </label>\n\
                </div>\n\
            </div>\n\
        </fieldset>\n\
        <fieldset className="slds-form--compound slds-m-bottom--small">\n\
            <legend className="slds-form-element__label">Location</legend>\n\
            <div className="form-element__group">\n\
                <div className="slds-form-element__row">\n\
                    <label className="slds-form-element__control slds-size--1-of-2">\n\
                        <small className="slds-form-element__helper">Latitude</small>\n\
                        <input className="slds-input" type="text" value={this.state.location ? this.state.location.x : ""} onChange={this.latitudeChange}/>\n\
                    </label>\n\
                    <label className="slds-form-element__control slds-size--1-of-2">\n\
                        <small className="slds-form-element__helper">Longitude</small>\n\
                        <input className="slds-input" type="text" value={this.state.location ? this.state.location.y : ""} onChange={this.longitudeChange}/>\n\
                    </label>\n\
                </div>\n\
            </div>\n\
        </fieldset>\n\
        <fieldset className="slds-form--compound slds-m-bottom--small">\n\
            <legend className="slds-form-element__label">Size</legend>\n\
            <div className="form-element__group">\n\
                <div className="slds-form-element__row">\n\
                    <label className="slds-form-element__control slds-size--1-of-3">\n\
                        <small className="slds-form-element__helper">Sqft</small>\n\
                        <input className="slds-input" type="text" valueLink={this.linkState("size")}/>\n\
                    </label>\n\
                    <label className="slds-form-element__control slds-size--1-of-3">\n\
                        <small className="slds-form-element__helper">Bedrooms</small>\n\
                        <input className="slds-input" type="text" valueLink={this.linkState("bedrooms")}/>\n\
                    </label>\n\
                    <label className="slds-form-element__control slds-size--1-of-3">\n\
                        <small className="slds-form-element__helper">Bathrooms</small>\n\
                        <input className="slds-input" type="text" valueLink={this.linkState("bathrooms")}/>\n\
                    </label>\n\
                </div>\n\
            </div>\n\
        </fieldset>\n\
        <div className="slds-form-element">\n\
            <label className="slds-form-element__label" htmlFor="sample1">Asking Price</label>\n\
            <div className="slds-form-element__control">\n\
                <input className="slds-input" type="text" valueLink={this.linkState("price")}/>\n\
            </div>\n\
        </div>\n\
    </div>\n\
    <div className="slds-col--padded slds-size--1-of-1 slds-medium-size--1-of-2">\n\
        <div className="slds-form-element">\n\
            <label className="slds-form-element__label" htmlFor="sample1">Teaser</label>\n\
            <div className="slds-form-element__control">\n\
                <input className="slds-input" type="text" valueLink={this.linkState("teaser")}/>\n\
            </div>\n\
        </div>\n\
        <div className="slds-form-element">\n\
            <label className="slds-form-element__label" htmlFor="sample2">Description</label>\n\
            <div className="slds-form-element__control">\n\
                <textarea id="description" rows="6" className="slds-textarea" valueLink={this.linkState("description")}></textarea>\n\
            </div>\n\
        </div>\n\
        <div className="slds-form-element">\n\
            <label className="slds-form-element__label" htmlFor="sample1">Picture URL</label>\n\
            <div className="slds-form-element__control">\n\
                <input className="slds-input" type="text" valueLink={this.linkState("pic")}/>\n\
            </div>\n\
        </div>\n\
    </div>\n\
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
        let property = this.props.property;\n\
        " + $.verbatim('return {...property};') + "\n\
    },\n\
    componentWillReceiveProps(props) {\n\
        let property = props.property;\n\
        " + $.verbatim('this.setState({...property});') + "\n\
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
