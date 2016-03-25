/*
 * generator-xrm
 * https://github.com/BclEx/generator-xrm
 *
 * Copyright (c) 2015 Sky Morey, contributors
 * Licensed under the MIT license.
 */

'use strict';

// External libs.
var util = require('util');
var themeBase = require('../theme-base.js');
var debug = require('debug')('generator:xrm');
var chalk = require('chalk');
var _ = require('lodash');

var Theme = module.exports = function Theme() {
    this._moduleName = 'theme:slds';
    themeBase.apply(this, arguments);
};
util.inherits(Theme, themeBase);

Theme.prototype.buildAllElements = function buildElement(s, fields) {
    var t0 = s[1];
    fields.forEach(function (prop) {
        t0.push({ rule: '.' + propName, decls: { float: 'left', 'margin-right': '3%' } });
    });
    fields.forEach(function(prop) {
        buildElement(s, prop);
    }.bind(this));
}

Theme.prototype.buildElement = function buildElement(s, prop) {
    var propName = prop.name;
    if (!propName) {
        this.log(chalk.bold('ERR! ' + chalk.green(this.entityName + ': { field.name: }') + ' not defined')); return false;
    }

    // build content
    var t1 = s[0];
    var t0 = s[1];
    if (_.some(['autoNumber', 'formula', 'rollupSummary', 'externalLookup'], hasOwnProperty, prop)) {
        // <div class="field firstName">
        //     <label for="firstName">Opportunity</label>
        //     <input name="firstName" type="text" name="data.firstName" ng-model="firstName" readonly />
        // </div>
        t0.push({ rule: '.' + propName, decls: { width: '20%' } });
        t1.push(function ($) { $('\
<div class="field ' + propName + '">\n\
    <label for="'+ propName + '">' + prop.label + '</label>\n\
    <input id="'+ propName + '" type="text" name="data.' + propName + '" ng-model="' + propName + '" readonly />\n\
</div>\n');
        });
    } else if (_.some(['lookup', 'masterDetail'], hasOwnProperty, prop)) {
        // <div class="field accountId">
        //     <label for="accountId">Account</label>
        //     <select id="accountId" name="data.accountId" ng-model="accountId" ng-required ng-options="jobStatus.name for jobStatus in jobStatuses" placeholder="Choose Status..." chosen>
        //         <option label=""></option>
        //     </select>
        // </div>
        t0.push({ rule: '.' + propName + 'Id', decls: { width: '20%' } });
        t1.push(function ($) { $('\
<div class="field ' + propName + '">\n\
    <label for="'+ propName + '">' + prop.label + '</label>\n\
    <select id="' + propName + '" name="data.' + propName + '" ng-model="' + propName + '" ng-required ng-options="jobStatus.name for jobStatus in jobStatuses" placeholder="Choose ' + prop.label + '..." chosen>\n\
        <option label=""></option>\n\
    </select>\n\
</div>\n');
        });
    } else if (prop.hasOwnProperty('checkbox')) {
        // <div class="field firstName">
        //     <label for="firstName">Opportunity</label>
        //     <input id="firstName" type="checkbox" name="data.firstName" ng-model="firstName" readonly />
        // </div>
        t0.push({ rule: '.' + propName, decls: { width: '20%' } });
        t1.push(function ($) { $('\
<div class="field ' + propName + '">\n\
    <label for="'+ propName + '">' + prop.label + '</label>\n\
    <input id="'+ propName + '" type="checkbox" name="data.' + propName + '" ng-model="' + propName + '" />\n\
</div>\n');
        });
    } else if (_.some(['currency', 'date', 'dateTime', 'email', 'geolocation', 'number', 'email', 'percent', 'phone', 'url'], hasOwnProperty, prop)) {
        // <div class="field firstName">
        //     <label for="firstName">Opportunity</label>
        //     <input id="firstName" type="[text/date/datetime/tel/url]" name="data.firstName" ng-model="firstName" readonly />
        // </div>
        var fieldType = null;
        if (prop.hasOwnProperty('currency')) fieldType = 'text';
        else if (prop.hasOwnProperty('date')) fieldType = 'date';
        else if (prop.hasOwnProperty('dateTime')) fieldType = 'datetime';
        else if (prop.hasOwnProperty('email')) fieldType = 'email';
        else if (prop.hasOwnProperty('geolocation')) fieldType = 'text';
        else if (prop.hasOwnProperty('number')) fieldType = 'text';
        else if (prop.hasOwnProperty('percent')) fieldType = 'text';
        else if (prop.hasOwnProperty('phone')) fieldType = 'tel';
        else if (prop.hasOwnProperty('url')) fieldType = 'url';
        t0.push({ rule: '.' + propName, decls: { width: '20%' } });
        t1.push(function ($) { $('\
<div class="field ' + propName + '">\n\
    <label for="'+ propName + '">' + prop.label + '</label>\n\
    <input id="'+ propName + '" type="'+ fieldType +'" name="data.' + propName + '" ng-model="' + propName + '" />\n\
</div>\n');
        });
    } else if (_.some(['picklist', 'picklistMulti'], hasOwnProperty, prop)) {
        //<div class="field status">
        //    <label for="status">Status</label>
        //    <select id="status" name="data.status" ng-model="status" ng-required ng-options="jobStatus.name for jobStatus in jobStatuses" placeholder="Choose Status..." chosen>
        //        <option label=""></option>
        //    </select>
        //</div>
        t0.push({ rule: '.' + propName, decls: { width: '20%' } });
        t1.push(function ($) { $('\
            <div class="field ' + propName + '">\n\
                <label for="'+ propName + '">' + prop.label + '</label>\n\
                <select id="' + propName + '" name="data.' + propName + '" ng-model="' + propName + '" ng-required ng-options="jobStatus.name for jobStatus in jobStatuses" placeholder="Choose ' + prop.label + '..." chosen>\n\
                    <option label=""></option>\n\
                </select>\n\
            </div>\n');
        });
    } else if (prop.hasOwnProperty('text')) {
        // <div class="field firstName">
        //     <label for="firstName">Opportunity</label>
        //     <input id="firstName" type="text" name="data.firstName" ng-model="firstName" readonly />
        // </div>
        t0.push({ rule: '.' + propName, decls: { width: '20%' } });
        t1.push(function ($) { $('\
<div class="field ' + propName + '">\n\
    <label for="'+ propName + '">' + prop.label + '</label>\n\
    <input id="'+ propName + '" type="text" name="data.' + propName + '" ng-model="' + propName + '" />\n\
</div>\n');
        });
    } else if (_.some(['textArea', 'textAreaLong', 'textAreaRich'], hasOwnProperty, prop)) {
        // <div class="field firstName">
        //     <label for="firstName">Opportunity</label>
        //     <textarea name="firstName" name="data.firstName" ng-model="firstName" readonly />
        // </div>
        t0.push({ rule: '.' + propName, decls: { width: '20%' } });
        t1.push(function ($) { $('\
<div class="field ' + propName + '">\n\
    <label for="'+ propName + '">' + prop.label + '</label>\n\
    <textarea id="'+ propName + '" name="data.' + propName + '" ng-model="' + propName + '" />\n\
</div>\n');
        });
    } else if (prop.hasOwnProperty('textEncrypted')) {
        // <div class="field firstName">
        //     <label for="firstName">Opportunity</label>
        //     <input id="firstName" type="text" name="data.firstName" ng-model="firstName" readonly />
        // </div>
        t0.push({ rule: '.' + propName, decls: { width: '20%' } });
        t1.push(function ($) { $('\
<div class="field ' + propName + '">\n\
    <label for="'+ propName + '">' + prop.label + '</label>\n\
    <input id="'+ propName + '" type="text" name="data.' + propName + '" ng-model="' + propName + '" />\n\
</div>\n');
        });
    } else {
        this.log(chalk.bold('ERR! ' + chalk.green(this.entityName + '.' + propName + ': { field.prop: }') + ' not matched')); return false;
    }
    return true;
};

Theme.prototype.buildHeader = function buildHeader(s) {
    var t1 = s[0];
    t1.push(function ($) { $('\
<div class="slds">\n\
    <div class="slds" style="margin-top:10px;margin-left:10px;">\n');
    });
};

Theme.prototype.buildFooter = function buildFooter(s) {
    var t1 = s[0];
    t1.push(function ($) { $('\
    </div>\n\
</div>\n');
    });
};

Theme.prototype.buildDetailHeader = function buildDetailHeader(s) {
};

Theme.prototype.buildListHeader = function buildListHeader(s) {
};