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
var debug = require('debug')('generator:xrm-core');
var chalk = require('chalk');
var Location = require('../util').Location;

var Generator = module.exports = function Generator() {
	this._moduleName = 'xrm-core:app';
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
	var database = this.options.database || 'mssql';
	var client = this.options.client || 'react';
	var server = this.options.server || 'aspnet';
	var template = this.options.template || { serverAspnet: null };
	var dest = this.options.dest || { database: null, html: null, js: null, css: null, server: null };
	var searchPaths = this.options.searchPaths || [];
	var ctx = this.getCtx(this.options.ctx || this.ctx);
	if (database !== 'none') {
		this.composeWith('xrm-core:database', { options: { database: database, dest: new Location(dest.database), ctx: ctx, searchPaths: searchPaths } });
	}
	if (client !== 'none') {
		this.composeWith('xrm-core:client-' + client, { options: { dest: { html: new Location(dest.html), js: new Location(dest.js), css: new Location(dest.css) }, ctx: ctx, searchPaths: searchPaths } });
	}
	if (server !== 'none') {
		this.composeWith('xrm-core:server-' + server, { options: { template: new Location(template.serverAspnet), dest: { api: new Location(dest.api), server: new Location(dest.server) }, ctx: ctx, searchPaths: searchPaths } });
	}
};