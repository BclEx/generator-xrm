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
    this._moduleName = 'theme:slds-angular';
    themeBase.apply(this, arguments);
};
util.inherits(Theme, themeBase);

Theme.prototype.buildAllElements = function buildAllElements(s, fields) {
    var flag = false;
    fields.forEach(function (prop) {
        flag |= this.buildElement(s, prop);
    }.bind(this));
    return flag;
};

Theme.prototype.buildForm = function buildForm(s, body) {
    var t1 = s[0];
    // <div ng-app="sampleModule">
    // <section class="form-entry sample-entry">
    //    <form name="sampleEntry" ng-controller="sampleEntryController as form" ng-submit="form.submit(jobEntry.$valid, data)">
    //    </form>
    // </section>
    // </div>
    t1.push(function (selector, $) {
        $(selector).append('\
<div ng-app="'+ this.entityName + 'Module">\n\
  <section class="form-entry ' + this.entityName + '-entry">\n\
    <form name="' + this.entityName + 'Entry" ng-controller="' + this.entityName + 'EntryController as form" ng-submit="form.submit(' + this.entityName + 'Entry.$valid, data)">\n');
    }.bind(this));
    body(s);
    t1.push(function (selector, $) {
        $(selector).append('\
    </form>\n\
  </section>\n\
</div>\n');
    });
};

Theme.prototype.buildElement = function buildElement(s, prop) {
    var propName = prop.name;
    if (!propName) {
        this.log(chalk.bold('ERR! ' + chalk.green(this.entityName + ': { field.name: }') + ' not defined')); return false;
    }

    // build content
    var t1 = s[0];
    if (_.some(['autoNumber', 'formula', 'rollupSummary', 'externalLookup'], hasOwnProperty, prop)) {
        // <div class="slds-form-element">
        //     <label class="slds-form-element__label" for="firstName">Opportunity</label>
        //     <div class="slds-form-element__control">
        //         <input id="firstName" class="slds-input" type="text" placeholder="Placeholder Text" name="data.firstName" ng-model="firstName" readonly />
        //     </div>
        // </div>
        t1.push(function (selector, $) {
            $(selector).append('\
<div class="slds-form-element">\n\
    <label class="slds-form-element__label" for="'+ propName + '">' + prop.label + '</label>\n\
    <div class="slds-form-element__control">\n\
        <input id="' + propName + '" class="slds-input" type="text" placeholder="Placeholder Text" name="data.' + propName + '" ng-model="' + propName + '" readonly />\n\
    </div>\n\
</div>\n');
        });
    } else if (_.some(['lookup', 'masterDetail'], hasOwnProperty, prop)) {
        // <div class="slds-lookup" data-select="multi" data-scope="single" data-typeahead="true">
        //     <div class="slds-form-element">
        //         <label class="slds-form-element__label" for="accountId">Account</label>
        //         <select name="accountId" ng-model="data.accountId" ng-required ng-options="jobStatus.name for jobStatus in jobStatuses" placeholder="Choose Status..." chosen>
        //             <option label=""></option>
        //         </select>
        //     </div>
        // </div>
        t1.push(function (selector, $) {
            $(selector).append('\
<div class="slds-lookup" data-select="multi" data-scope="single" data-typeahead="true">\n\
    <div class="slds-form-element">\n\
        <label class="slds-form-element__label" for="'+ propName + '">' + prop.label + '</label>\n\
        <select name="' + propName + '" name="data.' + propName + '" ng-required ng-options="jobStatus.name for jobStatus in jobStatuses" placeholder="Choose ' + prop.label + '..." chosen>\n\
            <option label=""></option>\n\
        </select>\n\
    </div>\n\
</div>\n');
        });
    } else if (prop.hasOwnProperty('checkbox')) {
        // <div class="slds-form-element">
        //     <div class="slds-form-element__control">
        //         <label class="slds-checkbox">
        //             <input id="firstName" type="checkbox" name="options" name="data.firstName" ng-model="firstName" />
        //             <span class="slds-checkbox--faux"></span>
        //             <span class="slds-form-element__label">First Name</span>
        //         </label>
        //     </div>
        // </div>
        t1.push(function (selector, $) {
            $(selector).append('\
<div class="slds-form-element">\n\
    <div class="slds-form-element__control">\n\
        <label class="slds-checkbox">\n\
            <input id="' + propName + '" type="checkbox" name="data.' + propName + '" ng-model="' + propName + '" />\n\
            <span class="slds-checkbox--faux"></span>\n\
            <span class="slds-form-element__label">' + prop.label + '</span>\n\
        </label>\n\
    </div>\n\
</div>\n');
        });
    } else if (_.some(['currency', 'date', 'dateTime', 'email', 'geolocation', 'number', 'email', 'percent', 'phone', 'url'], hasOwnProperty, prop)) {
        // <div class="slds-form-element">
        //     <label class="slds-form-element__label" for="firstName">Opportunity</label>
        //     <div class="slds-form-element__control">
        //         <input id="firstName" class="slds-input" type="[text/date/datetime/tel/url]" name="data.firstName" ng-model="firstName" />
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
        t1.push(function (selector, $) {
            $(selector).append('\
<div class="slds-form-element">\n\
    <label class="slds-form-element__label" for="'+ propName + '">' + prop.label + '</label>\n\
    <div class="slds-form-element__control">\n\
        <input id="'+ propName + '" class="slds-input" type="' + fieldType + '" name="data.' + propName + '" ng-model="' + propName + '" />\n\
    </div>\n\
</div>\n');
        });
    } else if (_.some(['picklist', 'picklistMulti'], hasOwnProperty, prop)) {
        // <div class="slds-form-element">
        //     <label class="slds-form-element__label" for="status">Status</label>
        //     <div class="slds-form-element__control">
        //         <div class="slds-select_container">
        //             <select id="status" name="data.status" ng-model="status" ng-required ng-options="jobStatus.name for jobStatus in jobStatuses" placeholder="Choose Status..." chosen>
        //                 <option label=""></option>
        //             </select>
        //         </div>
        //     </div>
        // </div>
        t1.push(function (selector, $) {
            $(selector).append('\
<div class="slds-form-element">\n\
    <label class="slds-form-element__label" for="'+ propName + '">' + prop.label + '</label>\n\
    <div class="slds-form-element__control">\n\
        <div class="slds-select_container">\n\
            <select id="' + propName + '" name="data.' + propName + '" ng-model="' + propName + '" ng-required ng-options="jobStatus.name for jobStatus in jobStatuses" placeholder="Choose ' + prop.label + '..." chosen>\n\
                <option label=""></option>\n\
            </select>\n\
        </div>\n\
    </div>\n\
</div>\n');
        });
    } else if (prop.hasOwnProperty('text')) {
        // <div class="slds-form-element">
        //     <label class="slds-form-element__label" for="firstName">Opportunity</label>
        //     <div class="slds-form-element__control">
        //         <input id="firstName" type="text" name="data.firstName" ng-model="firstName" />
        //     </div>
        // </div>
        t1.push(function (selector, $) {
            $(selector).append('\
<div class="slds-form-element">\n\
    <label class="slds-form-element__label" for="'+ propName + '">' + prop.label + '</label>\n\
    <div class="slds-form-element__control">\n\
        <input id="'+ propName + '" class="slds-input" type="text" name="data.' + propName + '" ng-model="' + propName + '" />\n\
    </div>\n\
</div>\n');
        });
    } else if (_.some(['textArea', 'textAreaLong', 'textAreaRich'], hasOwnProperty, prop)) {
        // <div class="slds-form-element">
        //     <label class="slds-form-element__label" for="firstName">Opportunity</label>
        //     <div class="slds-form-element__control">
        //         <textarea id="firstName" class="slds-textarea" name="data.firstName" ng-model="firstName" />
        //     </div>
        // </div>
        t1.push(function (selector, $) {
            $(selector).append('\
<div class="slds-form-element">\n\
    <label class="slds-form-element__label" for="'+ propName + '">' + prop.label + '</label>\n\
    <div class="slds-form-element__control">\n\
        <textarea id="'+ propName + '" class="slds-textarea" name="data.' + propName + '" ng-model="' + propName + '" />\n\
    </div>\n\
</div>\n');
        });
    } else if (prop.hasOwnProperty('textEncrypted')) {
        // <div class="slds-form-element">
        //     <label class="slds-form-element__label" for="firstName">Opportunity</label>
        //     <div class="slds-form-element__control">
        //         <input id="firstName" class="slds-input" type="text" name="data.firstName" ng-model="firstName" />
        //     </div>
        // </div>
        t1.push(function (selector, $) {
            $(selector).append('\
<div class="slds-form-element">\n\
    <label class="slds-form-element__label" for="'+ propName + '">' + prop.label + '</label>\n\
    <div class="slds-form-element__control">\n\
        <input id="'+ propName + '" class="slds-input" type="text" name="data.' + propName + '" ng-model="' + propName + '" />\n\
    </div>\n\
</div>\n');
        });
    } else {
        this.log(chalk.bold('ERR! ' + chalk.green(this.entityName + '.' + propName + ': { field.prop: }') + ' not matched')); return false;
    }
    return true;
};

Theme.prototype.buildHeader = function buildHeader(s, body) {
    var t1 = s[0];
    t1.push(function (selector, $) {
        $(selector).append('\
<div class="slds">\n\
    <div class="slds" style="margin-top:10px;margin-left:10px;">\n');
    });
    body(s);
    t1.push(function (selector, $) {
        $(selector).append('\
    </div>\n\
</div>\n');
    });
};

Theme.prototype.buildDetailHeader = function buildDetailHeader(s) {
    var t1 = s[0];
    t1.push(function (selector, $) {
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
    var t1 = s[0];
    t1.push(function (selector, $) {
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