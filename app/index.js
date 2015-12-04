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
var chalk = require('chalk');

var Generator = module.exports = function Generator() {
	scriptBase.apply(this, arguments);
	this.on('end', function () {
		var lib = this.env.get('xrm:database');
		console.log(lib);
		// this.composeWith('xrm:database', { options: { ctx: this.options.ctx } });
		// this.composeWith('xrm:client-angular', { options: { ctx: this.options.ctx } });
		// this.composeWith('xrm:server-aspnet', { options: { ctx: this.options.ctx });
	});
};

util.inherits(Generator, scriptBase);

Generator.prototype.createFiles = function createFiles() {
	this.log(chalk.green('Building app...'));
};