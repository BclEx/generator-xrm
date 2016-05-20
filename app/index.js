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
var debug = require('debug')('generator:xrm');
var chalk = require('chalk');
var Location = require('../util').Location;

var Generator = module.exports = function Generator() {
	this._moduleName = 'xrm:app';
	scriptBase.apply(this, arguments);
	this.conflicter.force = true;
	var done = this.async();
	this.on('end', function () {
		done();
	});
};

util.inherits(Generator, scriptBase);

Generator.prototype.createFiles = function createFiles() {
	debug('Defining app');
	var dest = this.options.dest || { database: null, html: null, js: null, css: null, server: null };
	this.composeWith('xrm:database', { options: { location: new Location(dest.database), ctx: this.ctx } });
	this.composeWith('xrm:client-angular', { options: { location: { html: new Location(dest.html), js: new Location(dest.js), css: new Location(dest.css) }, ctx: this.ctx } });
	//this.composeWith('xrm:server-aspnet', { options: { location: new Location(dest.server), ctx: this.ctx } });
};
