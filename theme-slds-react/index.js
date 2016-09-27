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
var themeBase = require('../theme-base.js');
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

Theme.prototype.buildLayout = function buildLayout(s, pack) {
    // build content
    var s0 = s[0];
    var self = this;
    _.forEach(pack.b, function (b) {
        //         s0.push('\
        // <div className="slds-col--padded slds-size--1-of-1 slds-medium-size--1-of-2">\n');
        _.forEach(b.p, function (p) {
            s0.push('\
<div className="slds-col--padded slds-size--1-of-1 slds-medium-size--1-of-2">\n');
            _.forEach(p, function (v) {
                self.buildElement(s, v.f, v.o);
            });
            s0.push('\
</div>\n');
        });
        //         s0.push('\
        // </div>\n');
    });
};

Theme.prototype.buildElement = function buildElement(s, prop, opt) {
    var propName = prop.name;
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

Theme.prototype.buildHeader = function buildHeader(s, body) {
    var s0 = s[0];
    s0.push(function (selector, $) {
        $(selector).append('\
<div class="slds">\n\
    <div class="slds" style="margin-top:10px;margin-left:10px;">\n');
    });
    body(s);
    s0.push(function (selector, $) {
        $(selector).append('\
    </div>\n\
</div>\n');
    });
};

Theme.prototype.buildDetailHeader = function buildDetailHeader(s) {
    var s0 = s[0];
    s0.push(function (selector, $) {
        $(selector).append('\
    <div class="slds-page-header" role="banner">\n\
    <div class="slds-grid">\n\
        <div class="slds-col slds-has-flexi-truncate">\n\
            <div class="slds-media">\n\
                <div class="slds-media__figure">\n\
                    <svg aria-hidden="true" class="slds-icon slds-icon--large slds-icon-standard-user">\n\
                        <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#user"></use>\n\
                    </svg>\n\
                </div>\n\
                <div class="slds-media__body">\n\
                    <p class="slds-text-heading--label">Record Type</p>\n\
                    <div class="slds-grid">\n\
                        <h1 class="slds-page-header__title slds-m-right--small slds-truncate slds-align-middle" title="Record Title">Record Title</h1>\n\
                        <div class="slds-col slds-shrink-none">\n\
                            <button class="slds-button slds-button--neutral slds-not-selected" aria-live="assertive">\n\
                                <span class="slds-text-not-selected">\n\
                                    <svg aria-hidden="true" class="slds-button__icon--stateful slds-button__icon--left">\n\
                                        <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#add"></use>\n\
                                    </svg>Follow\n\
                                </span>\n\
                                <span class="slds-text-selected">\n\
                                    <svg aria-hidden="true" class="slds-button__icon--stateful slds-button__icon--left">\n\
                                        <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#check"></use>\n\
                                    </svg>Following\n\
                                </span>\n\
                                <span class="slds-text-selected-focus">\n\
                                    <svg aria-hidden="true" class="slds-button__icon--stateful slds-button__icon--left">\n\
                                        <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#close"></use>\n\
                                    </svg>Unfollow\n\
                                </span>\n\
                            </button>\n\
                        </div>\n\
                    </div>\n\
                </div>\n\
            </div>\n\
        </div>\n\
        <div class="slds-col slds-no-flex slds-align-bottom">\n\
            <div class="slds-button-group" role="group">\n\
                <button class="slds-button slds-button--neutral">Edit</button>\n\
                <button class="slds-button slds-button--neutral">Delete</button>\n\
                <button class="slds-button slds-button--neutral">Clone</button>\n\
                <div class="slds-button--last">\n\
                    <button class="slds-button slds-button--icon-border-filled">\n\
                        <svg aria-hidden="true" class="slds-button__icon">\n\
                            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#down"></use>\n\
                        </svg>\n\
                        <span class="slds-assistive-text">More</span>\n\
                    </button>\n\
                </div>\n\
            </div>\n\
        </div>\n\
    </div>\n\
    <div class="slds-grid slds-page-header__detail-row">\n\
        <div class="slds-col--padded slds-size--1-of-4">\n\
            <dl>\n\
                <dt>\n\
                    <p class="slds-text-heading--label slds-truncate" title="Field 1">Field 1</p>\n\
                </dt>\n\
                <dd>\n\
                    <p class="slds-text-body--regular slds-truncate" title="Description that demonstrates truncation with a long text field">Description that demonstrates truncation with a long text field</p>\n\
                </dd>\n\
            </dl>\n\
        </div>\n\
        <div class="slds-col--padded slds-size--1-of-4">\n\
            <dl>\n\
                <dt>\n\
                    <p class="slds-text-heading--label slds-truncate" title="Field2 (3)">\n\
                        Field 2 (3)\n\
                        <button class="slds-button slds-button--icon-bare">\n\
                            <svg aria-hidden="true" class="slds-button__icon slds-button__icon--small">\n\
                                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#down"></use>\n\
                            </svg>\n\
                            <span class="slds-assistive-text">More Actions</span>\n\
                        </button>\n\
                    </p>\n\
                </dt>\n\
                <dd>\n\
                    <p class="slds-text-body--regular">Multiple Values</p>\n\
                </dd>\n\
            </dl>\n\
        </div>\n\
        <div class="slds-col--padded slds-size--1-of-4">\n\
            <dl>\n\
                <dt>\n\
                    <p class="slds-text-heading--label slds-truncate" title="Field 3">Field 3</p>\n\
                </dt>\n\
                <dd>\n\
                    <a href="javascript:void(0)">Hyperlink</a>\n\
                </dd>\n\
            </dl>\n\
        </div>\n\
        <div class="slds-col--padded slds-size--1-of-4">\n\
            <dl>\n\
                <dt>\n\
                    <p class="slds-text-heading--label slds-truncate" title="Field 4">Field 4</p>\n\
                </dt>\n\
                <dd>\n\
                    <p>\n\
                        <span>Description (2-line truncat...</span>\n\
                    </p>\n\
                </dd>\n\
            </dl>\n\
        </div>\n\
    </div>\n\
</div>\n');
    });
};

Theme.prototype.buildListHeader = function buildListHeader(s) {
    var s0 = s[0];
    s0.push(function (selector, $) {
        $(selector).append('\
<div class="slds-page-header" role="banner">\n\
    <div class="slds-grid">\n\
        <div class="slds-col slds-has-flexi-truncate">\n\
            <p class="slds-text-heading--label">Leads</p>\n\
            <div class="slds-grid">\n\
                <div class="slds-grid slds-type-focus slds-no-space">\n\
                    <h1 class="slds-text-heading--medium slds-truncate" title="My Leads (truncates)">My Leads (truncates)</h1>\n\
                    <button class="slds-button slds-button--icon-bare slds-shrink-none slds-align-middle slds-m-left--x-small">\n\
                        <svg aria-hidden="true" class="slds-button__icon">\n\
                            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#down"></use>\n\
                        </svg>\n\
                        <span class="slds-assistive-text">View More</span>\n\
                    </button>\n\
                </div>\n\
                <button class="slds-button slds-button--icon-more slds-shrink-none slds-m-left--large" aria-haspopup="true">\n\
                    <svg aria-hidden="true" class="slds-button__icon">\n\
                        <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#settings"></use>\n\
                    </svg>\n\
                    <span class="slds-assistive-text">Settings</span>\n\
                    <svg aria-hidden="true" class="slds-button__icon slds-button__icon--x-small">\n\
                        <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#down"></use>\n\
                    </svg>\n\
                </button>\n\
                <button class="slds-button slds-button--brand slds-button-space-left slds-m-right--medium slds-shrink-none slds-align-middle slds-hide" aria-hidden="true">Save</button>\n\
            </div>\n\
        </div>\n\
        <div class="slds-col slds-no-flex slds-align-bottom">\n\
            <div class="slds-grid">\n\
                <div class="slds-button-space-left">\n\
                    <button class="slds-button slds-button--icon-more" aria-haspopup="true">\n\
                        <svg aria-hidden="true" class="slds-button__icon">\n\
                            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#table"></use>\n\
                        </svg>\n\
                        <span class="slds-assistive-text">Table</span>\n\
                        <svg aria-hidden="true" class="slds-button__icon slds-button__icon--x-small">\n\
                            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#down"></use>\n\
                        </svg>\n\
                    </button>\n\
                </div>\n\
                <div class="slds-button-group slds-button-space-left" role="group">\n\
                    <button class="slds-button slds-button--icon-border slds-not-selected">\n\
                        <svg aria-hidden="true" class="slds-button__icon">\n\
                            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#chart"></use>\n\
                        </svg>\n\
                        <span class="slds-assistive-text">Chart</span>\n\
                    </button>\n\
                    <button class="slds-button slds-button--icon-border slds-not-selected">\n\
                        <svg aria-hidden="true" class="slds-button__icon">\n\
                            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#filterList"></use>\n\
                        </svg>\n\
                        <span class="slds-assistive-text">Filter List</span>\n\
                    </button>\n\
                    <button class="slds-button slds-button--icon-more">\n\
                        <svg aria-hidden="true" class="slds-button__icon">\n\
                            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#sort"></use>\n\
                        </svg>\n\
                        <span class="slds-assistive-text">Sort</span>\n\
                        <svg aria-hidden="true" class="slds-button__icon slds-button__icon--x-small">\n\
                            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#down"></use>\n\
                        </svg>\n\
                        <span class="slds-assistive-text">More</span>\n\
                    </button>\n\
                </div>\n\
                <div class="slds-button-group" role="group">\n\
                    <button class="slds-button slds-button--neutral">New Lead</button>\n\
                    <div class="slds-button--last">\n\
                        <button class="slds-button slds-button--icon-border-filled">\n\
                            <svg aria-hidden="true" class="slds-button__icon">\n\
                                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#down"></use>\n\
                            </svg>\n\
                            <span class="slds-assistive-text">More Actions</span>\n\
                        </button>\n\
                    </div>\n\
                </div>\n\
            </div>\n\
        </div>\n\
    </div>\n\
    <p class="slds-text-body--small slds-m-top--x-small">10 items • Sorted by Name</p>\n\
</div>\n');
    });
};