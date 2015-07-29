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
    this.log(chalk.green('Building app...'));
		// this.composeWith('xrm:client-angular', [this.options.args]);
		this.composeWith('xrm:database', [this.options.args]);
		// this.composeWith('xrm:server-aspnet', [this.options.args]);
  });
};

util.inherits(Generator, scriptBase);

Generator.prototype.dummy = function dummy() {
};