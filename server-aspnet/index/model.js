/*
 * generator-xrm
 * https://github.com/BclEx/generator-xrm
 *
 * Copyright (c) 2015 Sky Morey, contributors
 * Licensed under the MIT license.
 */

'use strict';

// External libs.
var chalk = require('chalk');
var _ = require('lodash');

function build(ctx, usings) {
    var ctxName = ctx.name;

    // build poco
    var usingSystem = true;
    var usingComponentModel = true;
    var usingDataAnnotations = false;
    var c = function (attribute, length) {
        if (!length) {
            return attribute;
        }
        usingDataAnnotations = true;
        attribute.push({ MaxLength: length });
        return attribute;
    };
    var t = [];
    t.push({ guid: { name: ctx.Id } });
    _.forEach(ctx.getFields(2), function (x) {
        var label = x.label || x.name;
        var maxlength;
        var defaultValue;
        if (x.hasOwnProperty('autoNumber')) {
            // notimplemented
        } else if (x.hasOwnProperty('formula')) {
            // skip
        } else if (x.hasOwnProperty('rollupSummary')) {
            // notimplemented
        } else if (x.hasOwnProperty('lookup')) {
            usingSystem = true;
            t.push({ guid: { name: x.Id }, attribute: [{ DisplayName: label }] });
        } else if (x.hasOwnProperty('masterDetail')) {
            usingSystem = true;
            t.push({ guid: { name: x.Id }, attribute: [{ DisplayName: label }] });
        } else if (x.hasOwnProperty('externalLookup')) {
            t.push({ string: { name: x.Id }, attribute: [{ DisplayName: label }] });
        } else if (x.hasOwnProperty('checkbox')) {
            defaultValue = x.checkbox.defaultValue;
            t.push({ bool: { name: x.Id }, attribute: [{ DisplayName: label }] });
        } else if (x.hasOwnProperty('currency')) {
            t.push({ decimal: { name: x.Id }, attribute: [{ DisplayName: label }] });
        } else if (x.hasOwnProperty('date')) {
            usingSystem = true;
            t.push({ dateTime: { name: x.Id }, attribute: [{ DisplayName: label }] });
        } else if (x.hasOwnProperty('dateTime')) {
            usingSystem = true;
            t.push({ dateTime: { name: x.Id }, attribute: [{ DisplayName: label }] });
        } else if (x.hasOwnProperty('email')) {
            t.push({ string: { name: x.Id }, attribute: [{ DisplayName: label }] });
        } else if (x.hasOwnProperty('geolocation')) {
            // notimplemented
        } else if (x.hasOwnProperty('number')) {
            var scale = x.number.scale || 0;
            if (scale == 0) {
                t.push({ int: { name: x.Id }, attribute: [{ DisplayName: label }] });
            } else {
                t.push({ decimal: { name: x.Id }, attribute: [{ DisplayName: label }] });
            }
        } else if (x.hasOwnProperty('percent')) {
            t.push({ decimal: { name: x.Id }, attribute: [{ DisplayName: label }] });
        } else if (x.hasOwnProperty('phone')) {
            t.push({ string: { name: x.Id }, attribute: [{ DisplayName: label }] });
        } else if (x.hasOwnProperty('picklist')) {
            t.push({ string: { name: x.Id }, attribute: [{ DisplayName: label }] });
        } else if (x.hasOwnProperty('picklistMulti')) {
            t.push({ string: { name: x.Id }, attribute: [{ DisplayName: label }] });
        } else if (x.hasOwnProperty('text')) {
            maxlength = x.text.length;
            t.push({ string: { name: x.Id }, attribute: c([{ DisplayName: label }], maxlength) });
        } else if (x.hasOwnProperty('textArea')) {
            maxlength = x.textArea.length;
            t.push({ string: { name: x.Id }, attribute: c([{ DisplayName: label }], maxlength) });
        } else if (x.hasOwnProperty('textAreaLong')) {
            maxlength = x.textAreaLong.length;
            t.push({ string: { name: x.Id }, attribute: c([{ DisplayName: label }], maxlength) });
        } else if (x.hasOwnProperty('textAreaRich')) {
            maxlength = x.textAreaRich.length;
            t.push({ string: { name: x.Id }, attribute: c([{ DisplayName: label }], maxlength) });
        } else if (x.hasOwnProperty('textEncrypted')) {
            maxlength = x.textEncrypted.length;
            t.push({ string: { name: x.Id }, attribute: c([{ DisplayName: label }], maxlength) });
        } else if (x.hasOwnProperty('url')) {
            t.push({ string: { name: x.Id }, attribute: [{ DisplayName: label }] });
        } else {
            this.log(chalk.bold('ERR! ' + chalk.green(ctxName + '.' + x.name + ': { field.x: }') + ' not matched'));
             return null;
        }
    }.bind(this));
    if (usingSystem) usings.push('System');
    if (usingComponentModel) usings.push('System.ComponentModel');
    if (usingDataAnnotations) usings.push('System.ComponentModel.DataAnnotations');
    return t;
}

module.exports = {
    build: build,
};
