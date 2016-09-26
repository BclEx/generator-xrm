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
    <div aria-hidden="false" role="dialog" className="slds-modal slds-fade-in-open">\n\
        <div className="slds-modal__container">\n\
            <div className="slds-modal__header">\n\
                <h2 className="slds-text-heading--medium">New Property</h2>\n\
                <button className="slds-button slds-modal__close">\n\
                    <svg aria-hidden="true" className="slds-button__icon slds-button__icon--inverse slds-button__icon--large">\n\
                    </svg>\n\
                    <span className="slds-assistive-text">Close</span>\n\
                </button>\n\
            </div>\n\
            <div className="slds-modal__content">\n\
\n\
                <div className="slds-form--stacked">\n\
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
                    <fieldset className="slds-form--compound slds-m-bottom--medium">\n\
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
\n\
            </div>\n\
            <div className="slds-modal__footer">\n\
                <button className="slds-button slds-button--neutral" onClick={this.props.onCancel}>Cancel</button>\n\
                <button className="slds-button slds-button--neutral slds-button--brand" onClick={this.onSave}>Save</button>\n\
            </div>\n\
        </div>\n\
    </div>\n\
    <div className="slds-modal-backdrop slds-modal-backdrop--open"></div>\n\
</div>)';
        $.body.append(q("\
import React from 'react';\n\
import LinkedStateMixin from 'react-addons-linked-state-mixin';\n\
export default React.createClass({\n\
    mixins: [LinkedStateMixin],\n\
    getInitialState() {\n\
        let contact = this.props.contact;\n\
        " + $.verbatim('return {...contact};') + "\n\
    },\n\
    onSave() {\n\
        this.props.onSave(this.state);\n\
    },\n\
    render() {" + $.verbatim(q(render, ctx)) + "}\n\
});", ctx));
    }.bind(this));
}

module.exports = {
  build: build,
};
