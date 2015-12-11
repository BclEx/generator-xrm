/*
 * generator-fragment
 * https://github.com/BclEx/generator-fragment
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
	var dest = this.options.dest;
	this.composeWith('xrm:database', { options: [new Location(dest.database), this.options] });
	// this.composeWith('xrm:client-angular', { options: [new Location(dest.client), this.options] });
	// this.composeWith('xrm:server-aspnet', { options: [new Location(dest.server), this.options] });
};
