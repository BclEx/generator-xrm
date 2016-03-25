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
var scriptBase = require('../script-base.js');
var yeoman = require('yeoman-generator');
var debug = require('debug')('generator:xrm');
var chalk = require('chalk');
var Location = require('../util').Location;
var _ = require('lodash');
var Theme = require('../theme-slds');

var Generator = module.exports = function Generator() {
    this._moduleName = 'xrm:client-angular';
    scriptBase.apply(this, arguments);
    var done = this.async();
    this.on('end', function() {
        done();
    });
};
util.inherits(Generator, scriptBase);

Generator.prototype.createFiles = function createFiles() {
    debug('Defining client');
    var ctx = this.options.ctx;

    // ctx
    var entityName = ctx.name || 'entity';
    var fields = ctx.fields;
    if (!Array.isArray(fields)) {
        this.log(chalk.bold('ERR! ' + chalk.green('{ fields: }') + ' not array')); return null;
    }

    // build content
    var s = [[][][]];
    var theme = new Theme(entityName, this.log);
    theme.buildAllElements(s, fields);

    var locationHtml = this.location.html || new Location();
    var locationJs = this.location.jss || new Location();
    var locationCss = this.location.css || new Location();
    var htmlCtx = {
        _name: entityName,
        _file: locationHtml.getEnsuredPath(entityName, entityName + '-entry.cshtml'),
        html: function(args, $) {
            var form = $('');
            $('html').append(form);
            return $;
        }
    };
    var cssCtx = {
        _name: entityName,
        _file: locationJs.getEnsuredPath('css/partials', '_' + entityName + '-entry.scss'),
        createCss: {}
    };
    var jsCtx = {
        _name: entityName,
        _file: locationCss.getEnsuredPath('src/modules', entityName + 'Module.js'),
    };
    //console.log(htmlCtx);
    this.composeWith('fragment:html', { options: { ctx: htmlCtx } });
    //this.composeWith('fragment:css', { options: { ctx: cssCtx } });
    //this.composeWith('fragment:js', { options: { ctx: jsCtx } });
};
