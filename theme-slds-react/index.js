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
var util = require('util');
var themeBase = require('../theme-base');
var debug = require('debug')('generator:xrm-core');
var chalk = require('chalk');
var _ = require('lodash');

var Theme = module.exports = function Theme() {
    this._moduleName = 'theme:slds-react';
    themeBase.apply(this, arguments);
};
util.inherits(Theme, themeBase);

var XML_CHARACTER_MAP = {
    '&': '&amp;',
    '"': '&quot;',
    "'": '&apos;',
    '<': '&lt;',
    '>': '&gt;'
};
Theme.prototype.escapeForXML = function escapeForXML(string) {
    return string && (string.replace ? string.replace(/([&"<>'])/g, function (str, item) { return XML_CHARACTER_MAP[item]; }) : string);
};

Theme.prototype.buildLayout = function buildLayout(s, view, pack) {
    // build content
    var s0 = s[0];
    var self = this;
    _.forEach(pack.b, function (b) {
        //         s0.push('\
        // <div className="slds-col--padded slds-size--1-of-1 slds-medium-size--1-of-2">\n');
        _.forEach(b.p, function (p) {
            var className = 'slds-col--padded slds-size--1-of-1 slds-medium-size--1-of-2';
            if (view) {
                className = 'slds-col--padded slds-size--1-of-2 slds-medium-size--1-of-3 slds-m-top--medium';
            }
            s0.push('\
<div className="'+ className + '">\n');
            _.forEach(p, function (v) {
                if (view) {
                    self.buildViewField(s, v.f, v.o);
                } else {
                    self.buildInputField(s, v.f, v.o);
                }
            });
            s0.push('\
</div>\n');
        });
        //         s0.push('\
        // </div>\n');
    });
};

Theme.prototype.buildViewField = function buildViewField(s, prop, opt) {
    var propName = prop.id;
    if (!propName) {
        this.log(chalk.bold('ERR! ' + chalk.green(this.entityName + ': { field.name: }') + ' not defined')); return false;
    }

    // build content
    var s0 = s[0];
    var _hasOwnProperty = function (name) { return prop.hasOwnProperty(name); };
    if (_.some(['lookup', 'masterDetail'], _hasOwnProperty)) {
        s0.push('\
<dl className="page-header--rec-home__detail-item">\n\
    <dt>\n\
        <p className="slds-text-heading--label slds-truncate" title="' + encodeURI(prop.label) + '">' + this.escapeForXML(prop.label) + '</p>\n\
    </dt>\n\
    <dd>\n\
        <p className="slds-text-body--regular slds-truncate" title="">{this.props.entity.'+ propName + '}</p>\n\
    </dd>\n\
</dl>\n');
    } else {
        s0.push('\
<dl className="page-header--rec-home__detail-item">\n\
    <dt>\n\
        <p className="slds-text-heading--label slds-truncate" title="' + encodeURI(prop.label) + '">' + this.escapeForXML(prop.label) + '</p>\n\
    </dt>\n\
    <dd>\n\
        <p className="slds-text-body--regular slds-truncate" title="">{this.props.entity.'+ propName + '}</p>\n\
    </dd>\n\
</dl>\n');
    }
    return true;
};


Theme.prototype.buildInputField = function buildInputField(s, prop, opt) {
    var propName = prop.id;
    if (!propName) {
        this.log(chalk.bold('ERR! ' + chalk.green(this.entityName + ': { field.name: }') + ' not defined')); return false;
    }
    var a = 0, b = 2;

    // build content
    var s0 = s[0];
    var _hasOwnProperty = function (name) { return prop.hasOwnProperty(name); };
    if (_.some(['autoNumber', 'formula', 'rollupSummary', 'externalLookup'], _hasOwnProperty)) {
        // <div className="slds-form-element">
        //     <label className="slds-form-element__label" htmlFor="firstName">Opportunity</label>
        //     <div className="slds-form-element__control">
        //         <input className="slds-input" type="text" placeholder="Placeholder Text" valueLink={this.linkState("firstName")} readonly />
        //     </div>
        // </div>
        if (a) {
            s0.push('\
<label className="slds-form-element__control slds-size--' + a + '-of-' + b + '">\n\
    <small className="slds-form-element__control">' + this.escapeForXML(prop.label) + '</label>\n\
    <input class="slds-input" type="text" placeholder="Placeholder Text" valueLink={this.linkState("' + propName + '")} readonly />\n\
</label>\n');
        } else {
            s0.push('\
<div className="slds-form-element">\n\
    <label className="slds-form-element__label" htmlFor="' + propName + '">' + this.escapeForXML(prop.label) + '</label>\n\
    <div className="slds-form-element__control">\n\
        <input className="slds-input" type="text" placeholder="Placeholder Text" valueLink={this.linkState("' + propName + '")} readonly />\n\
    </div>\n\
</div>\n');
        }
    } else if (_.some(['lookup', 'masterDetail'], _hasOwnProperty)) {
        // <div className="slds-lookup">
        //     <div className="slds-form-element">
        //         <label className="slds-form-element__label" htmlFor="accountId">Account</label>
        //         <select valueLink={this.linkState("firstName")} />
        //     </div>
        // </div>
        if (a) {
            s0.push('\
<label className="slds-form-element__control slds-size--' + a + '-of-' + b + '">\n\
    <small className="slds-form-element__control">' + this.escapeForXML(prop.label) + '</label>\n\
    <select />\n\
</label>\n');
        } else {
            s0.push('\
<div class="slds-lookup">\n\
    <div class="slds-form-element">\n\
        <label class="slds-form-element__label" htmlFor="' + propName + '">' + prop.label + '</label>\n\
        <select />\n\
    </div>\n\
</div>\n');
        }
    } else if (prop.hasOwnProperty('checkbox')) {
        // <div className="slds-form-element">
        //     <div className="slds-form-element__control">
        //         <label className="slds-checkbox">
        //             <input id="firstName" type="checkbox" valueLink={this.linkState("firstName")} />
        //             <span class="slds-checkbox--faux"></span>
        //             <span class="slds-form-element__label">First Name</span>
        //         </label>
        //     </div>
        // </div>
        if (a) {
            s0.push('\
<label className="slds-form-element__control slds-size--' + a + '-of-' + b + '">\n\
    <input type="checkbox" valueLink={this.linkState("' + propName + '")} />\n\
    <small className="slds-form-element__control">' + this.escapeForXML(prop.label) + '</label>\n\
</label>\n');
        } else {
            s0.push('\
<div class="slds-form-element">\n\
    <div class="slds-form-element__control">\n\
        <label class="slds-checkbox">\n\
            <input type="checkbox" valueLink={this.linkState("' + propName + '")} />\n\
            <span class="slds-checkbox--faux"></span>\n\
            <span class="slds-form-element__label">' + this.escapeForXML(prop.label) + '</span>\n\
        </label>\n\
    </div>\n\
</div>\n');
        }
    } else if (_.some(['currency', 'date', 'dateTime', 'email', 'geolocation', 'number', 'email', 'percent', 'phone', 'url'], _hasOwnProperty)) {
        // <div className="slds-form-element">
        //     <label className="slds-form-element__label" htmlFor="firstName">Opportunity</label>
        //     <div className="slds-form-element__control">
        //         <input className="slds-input" type="[text/date/datetime/tel/url]" valueLink={this.linkState("firstName")} />
        //     </div>
        // </div>
        var fieldType = null;
        if (prop.hasOwnProperty('currency')) { fieldType = 'text'; }
        else if (prop.hasOwnProperty('date')) { fieldType = 'date'; }
        else if (prop.hasOwnProperty('dateTime')) { fieldType = 'datetime'; }
        else if (prop.hasOwnProperty('email')) { fieldType = 'email'; }
        else if (prop.hasOwnProperty('geolocation')) { fieldType = 'text'; }
        else if (prop.hasOwnProperty('number')) { fieldType = 'text'; }
        else if (prop.hasOwnProperty('percent')) { fieldType = 'text'; }
        else if (prop.hasOwnProperty('phone')) { fieldType = 'tel'; }
        else if (prop.hasOwnProperty('url')) { fieldType = 'url'; }
        if (a) {
            s0.push('\
<label className="slds-form-element__control slds-size--' + a + '-of-' + b + '">\n\
    <small className="slds-form-element__control">' + this.escapeForXML(prop.label) + '</label>\n\
    <input className="slds-input" type="' + fieldType + '" valueLink={this.linkState("' + propName + '")} />\n\
</label>\n');
        } else {
            s0.push('\
<div className="slds-form-element">\n\
    <label className="slds-form-element__label" htmlFor="' + propName + '">' + this.escapeForXML(prop.label) + '</label>\n\
    <div className="slds-form-element__control">\n\
        <input className="slds-input" type="' + fieldType + '" valueLink={this.linkState("' + propName + '")} />\n\
    </div>\n\
</div>\n');
        }
    } else if (_.some(['picklist', 'picklistMulti'], _hasOwnProperty)) {
        // <div className="slds-form-element">
        //     <label className="slds-form-element__label" htmlFor="status">Status</label>
        //     <div className="slds-form-element__control">
        //         <div className="slds-select_container">
        //             <select placeholder="Choose Status..." valueLink={this.linkState("firstName")} />
        //         </div>
        //     </div>
        // </div>
        if (a) {
            s0.push('\
<label className="slds-form-element__control slds-size--' + a + '-of-' + b + '">\n\
    <small className="slds-form-element__control">' + this.escapeForXML(prop.label) + '</label>\n\
    <select placeholder="Choose ' + this.escapeForXML(prop.label) + '..." valueLink={this.linkState("' + propName + '")} />\n\
</label>\n');
        } else {
            s0.push('\
<div className="slds-form-element">\n\
    <label className="slds-form-element__label" htmlFor="' + propName + '">' + this.escapeForXML(prop.label) + '</label>\n\
    <div className="slds-form-element__control">\n\
        <div className="slds-select_container">\n\
            <select placeholder="Choose ' + this.escapeForXML(prop.label) + '..." valueLink={this.linkState("' + propName + '")} />\n\
        </div>\n\
    </div>\n\
</div>\n');
        }
    } else if (prop.hasOwnProperty('text')) {
        // <div className="slds-form-element">
        //     <label className="slds-form-element__label" htmlFor="firstName">Opportunity</label>
        //     <div className="slds-form-element__control">
        //         <input type="text" valueLink={this.linkState("firstName")} />
        //     </div>
        // </div>
        if (a) {
            s0.push('\
<label className="slds-form-element__control slds-size--' + a + '-of-' + b + '">\n\
    <small className="slds-form-element__control">' + this.escapeForXML(prop.label) + '</label>\n\
    <input className="slds-input" type="text" valueLink={this.linkState("' + propName + '")} />\n\
</label>\n');
        } else {
            s0.push('\
<div className="slds-form-element">\n\
    <label className="slds-form-element__label" htmlFor="' + propName + '">' + this.escapeForXML(prop.label) + '</label>\n\
    <div className="slds-form-element__control">\n\
        <input className="slds-input" type="text" valueLink={this.linkState("' + propName + '")} />\n\
    </div>\n\
</div>\n');
        }
    } else if (_.some(['textArea', 'textAreaLong', 'textAreaRich'], _hasOwnProperty)) {
        // <div className="slds-form-element">
        //     <label className="slds-form-element__label" htmlFor="firstName">Opportunity</label>
        //     <div className="slds-form-element__control">
        //         <textarea className="slds-textarea" valueLink={this.linkState("firstName")} />
        //     </div>
        // </div>
        if (a) {
            s0.push('\
<label className="slds-form-element__control slds-size--' + a + '-of-' + b + '">\n\
    <small className="slds-form-element__control">' + this.escapeForXML(prop.label) + '</label>\n\
    <textarea className="slds-textarea" valueLink={this.linkState("' + propName + '")} />\n\
</label>\n');
        } else {
            s0.push('\
<div className="slds-form-element">\n\
    <label className="slds-form-element__label" htmlFor="' + propName + '">' + this.escapeForXML(prop.label) + '</label>\n\
    <div className="slds-form-element__control">\n\
        <textarea className="slds-textarea" valueLink={this.linkState("' + propName + '")} />\n\
    </div>\n\
</div>\n');
        }
    } else if (prop.hasOwnProperty('textEncrypted')) {
        // <div className="slds-form-element">
        //     <label className="slds-form-element__label" htmlFor="firstName">Opportunity</label>
        //     <div className="slds-form-element__control">
        //         <input className="slds-input" type="text" valueLink={this.linkState("firstName")} />
        //     </div>
        // </div>
        if (a) {
            s0.push('\
<label className="slds-form-element__control slds-size--' + a + '-of-' + b + '">\n\
    <small className="slds-form-element__control">' + this.escapeForXML(prop.label) + '</label>\n\
    <input className="slds-input" type="text" valueLink={this.linkState("' + propName + '")} />\n\
</label>\n');
        } else {
            s0.push('\
<div className="slds-form-element">\n\
    <label className="slds-form-element__label" htmlFor="' + propName + '">' + this.escapeForXML(prop.label) + '</label>\n\
    <div className="slds-form-element__control">\n\
        <input className="slds-input" type="text" valueLink={this.linkState("' + propName + '")} />\n\
    </div>\n\
</div>\n');
        }
    } else {
        this.log(chalk.bold('ERR! ' + chalk.green(this.entityName + '.' + propName + ': { field.prop: }') + ' not matched')); return false;
    }
    return true;
};
