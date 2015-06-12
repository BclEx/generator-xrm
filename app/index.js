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

var Generator = module.exports = function Generator() {
	scriptBase.apply(this, arguments);
};

util.inherits(Generator, scriptBase);

Generator.prototype.createAppFiles = function createAppFiles() {
  //this.log(this.options.ctx.name);
};