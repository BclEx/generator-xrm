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
var scriptBase = require('../script-base');
var yeoman = require('yeoman-generator');
var debug = require('debug')('generator:xrm-core');
var chalk = require('chalk');
var Location = require('../util').Location;
var _ = require('lodash');
var Theme = require('../theme-slds-angular');

var Generator = module.exports = function Generator() {
    this._moduleName = 'xrm-core:client-angular';
    scriptBase.apply(this, arguments);
    var done = this.async();
    this.on('end', function () {
        done();
    });
};
util.inherits(Generator, scriptBase);

Generator.prototype.createFiles = function createFiles() {
    debug('Defining client');
    var ctx = this.getCtx(this.options.ctx || this.ctx);

    // ctx
    var entityName = ctx.name || 'entity';
    var fields = ctx.getFields(2);

    // build content
    var s = [[], [], []];
    var theme = new Theme(entityName, this.log);
    //theme.buildAllElements(s, fields);

    var dest = this.options.dest || { html: null, js: null, css: null };
    var destHtml = dest.html || new Location();
    var destJs = dest.js || new Location();
    var destCss = dest.css || new Location();
    var htmlCtx = {
        _name: entityName,
        _file: destHtml.getEnsuredPath(entityName, entityName + '-entry.cshtml'),
        // html: function (args, $) {
        //     var form = $('html');
        //     $('html').append(form);
        //     return $;
        // }
        html: { append: s[0] },
    };
    var jsCtx = {
        _name: entityName,
        _file: destJs.getEnsuredPath('src/modules', entityName + 'Module.js'),
        js: {}
    };
    var cssCtx = {
        _name: entityName,
        _file: destCss.getEnsuredPath('css/partials', '_' + entityName + '-entry.scss'),
        css: {}
    };
    //console.log(htmlCtx);
    //this.composeWith('fragment:html', { options: { ctx: htmlCtx } });
    //this.composeWith('fragment:js', { options: { ctx: jsCtx } });
    //this.composeWith('fragment:css', { options: { ctx: cssCtx } });
};