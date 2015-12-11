/*
 * grunt-xml
 * https://gruntjs.com/
 *
 * Copyright (c) 2015 Sky Morey, contributors
 * Licensed under the MIT license.
 */

'use strict';

// External libs.
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var debug = require('debug')('generator:xrm');
var chalk = require('chalk');
var yosay = require('yosay');

var Generator = module.exports = yeoman.generators.Base.extend({

exports.init = function (grunt) {
    var exports = {};
    exports.process = function (entity, dest, options) {
        options = options || {};
        grunt.verbose.write('Generating AngularJS code...');
        //
        var html0 = '';
        var entityName = entity.name;
        entity.fields.forEach(function (prop) {
            var propName = prop.name;
            if (prop.text) {
                //<div class="field opportunityId">
                //    <label for="opportunityId">Opportunity</label>
                //    <input name="opportunityId" type="text" name="data.opportunityId" ng-model="opportunityId" readonly />
                //</div>
                html0 += '\
        <div class="field '+ propName + '">\n\
            <label for="'+ propName + '">' + prop.label + '</label>\n\
            <input name="'+ propName + '" type="text" name="data.' + propName + '" ng-model="' + propName + '" readonly />\n\
        </div>\n';
            } else if (prop.memo) {
                //<div class="field opportunityId">
                //    <label for="opportunityId">Opportunity</label>
                //    <textarea name="opportunityId" name="data.opportunityId" ng-model="opportunityId" readonly />
                //</div>
                html0 += '\
        <div class="field '+ propName + '">\n\
            <label for="'+ propName + '">' + prop.label + '</label>\n\
            <textarea name="'+ propName + '" name="data.' + propName + '" ng-model="' + propName + '" readonly />\n\
        </div>\n';
            } else if (prop.lookup) {
                //<div class="field status">
                //    <label for="status">Status</label>
                //    <select name="status" ng-model="data.status" ng-required ng-options="jobStatus.name for jobStatus in jobStatuses" placeholder="Choose Status..." chosen>
                //        <option label=""></option>
                //    </select>
                //</div>
                html0 += '\
        <div class="field '+ propName + '">\n\
            <label for="'+ propName + '">' + prop.label + '</label>\n\
            <select name="' + propName + '" name="data.' + propName + '" ng-required ng-options="jobStatus.name for jobStatus in jobStatuses" placeholder="Choose ' + prop.label + '..." chosen>\n\
                <option label=""></option>\n\
            </select>\n\
        </div>\n';
            } else if (prop.picklist) {
                //<div class="field status">
                //    <label for="status">Status</label>
                //    <select name="status" ng-model="data.status" ng-required ng-options="jobStatus.name for jobStatus in jobStatuses" placeholder="Choose Status..." chosen>
                //        <option label=""></option>
                //    </select>
                //</div>
                html0 += '\
        <div class="field ' + propName + '">\n\
            <label for="'+ propName + '">' + prop.label + '</label>\n\
            <select name="' + propName + '" name="data.' + propName + '" ng-required ng-options="jobStatus.name for jobStatus in jobStatuses" placeholder="Choose ' + prop.label + '..." chosen>\n\
                <option label=""></option>\n\
            </select>\n\
        </div>\n';
            } else if (prop.date) {
                //<div class="field opportunityId">
                //    <label for="opportunityId">Opportunity</label>
                //    <input name="opportunityId" type="date" name="data.opportunityId" ng-model="opportunityId" readonly />
                //</div>
                html0 += '\
        <div class="field '+ propName + '">\n\
            <label for="'+ propName + '">' + prop.label + '</label>\n\
            <input name="'+ propName + '" type="date" name="data.' + propName + '" ng-model="' + propName + '" readonly />\n\
        </div>\n';
            } else if (prop.decimal) {
                //<div class="field opportunityId">
                //    <label for="opportunityId">Opportunity</label>
                //    <input name="opportunityId" type="decimal" name="data.opportunityId" ng-model="opportunityId" readonly />
                //</div>
                html0 += '\
        <div class="field '+ propName + '">\n\
            <label for="'+ propName + '">' + prop.label + '</label>\n\
            <input name="'+ propName + '" type="decimal" name="data.' + propName + '" ng-model="' + propName + '" readonly />\n\
        </div>\n';
            } else if (prop.currency) {
                //<div class="field opportunityId">
                //    <label for="opportunityId">Opportunity</label>
                //    <input name="opportunityId" type="currency" name="data.opportunityId" ng-model="opportunityId" readonly />
                //</div>
                html0 += '\
        <div class="field '+ propName + '">\n\
            <label for="'+ propName + '">' + prop.label + '</label>\n\
            <input name="'+ propName + '" type="currency" name="data.' + propName + '" ng-model="' + propName + '" readonly />\n\
        </div>\n';
            } else { grunt.fail.warn('unknown attribute'); }
        });
        var r = '\
<form name="jobEntry" ng-controller="JobEntryController as form" ng-submit="form.submit(jobEntry.$valid, data)">\n\
    <fieldset class="offical-use" ng-if="officalUse">\n\
'+ html0 + '\n\
    </fieldset>\n\
</form>';

        // Write the destination file.
        grunt.file.write(dest + '/' + entityName + '.aspx', r);
        grunt.verbose.writeln(r);
        grunt.verbose.ok();
        return null;
    };

    return exports;
};
