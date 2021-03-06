'use strict';
var _ = require('lodash');
var fs = require('fs');
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var debug = require('debug')('generator:xrm-core');
var chalk = require('chalk');
var Location = require('./util').Location;
var XrmParse = require('./xrm-parse');

function getObjectNameParts(objectName) {
  var pieces = objectName.split('.');
  if (!pieces || pieces.length === 1) {
    return ['dbo', pieces ? pieces[0] : objectName];
  }
  return [pieces[0], pieces[1]];
}

var Generator = module.exports = function Generator() {
  //debug(this._moduleName, arguments);
  var ctx = {};
  var location = null;
  var a = arguments[0];
  if (typeof a[0] === 'undefined') {
    a = arguments[1];
    ctx = a.ctx || {};
    location = a.location;
    debug(this._moduleName + ' from parent: ' + ctx.name);
  } else if (typeof a[0] !== 'string') {
    ctx = a[0] || {};
    arguments[0].shift();
    debug(this._moduleName + ' from ctx: ' + ctx.name);
  } else {
    var name = null;
    try {
      var filePath = path.join(process.cwd(), a[0] + '.js');
      var nameParts = getObjectNameParts(path.basename(filePath, '.js'));
      ctx = eval('[' + fs.readFileSync(filePath, 'utf8') + ']')[0]; // jshint ignore:line
      ctx.searchPaths = [path.dirname(filePath)];
      ctx.schemaName = nameParts[0];
      ctx.name = nameParts[1];
      debug(this._moduleName + ' from file: ' + ctx.name);
    } catch (e) { debug('An error occured while running ' + name, e); this.log(chalk.bold(e)); }
  }
  yeoman.Base.apply(this, arguments);
  this.ctx = ctx;
  this.location = location;
  var self = this;
  this.getCtx = function (ctx) {
    if (!ctx.Id) {
      XrmParse.bindCtx.call(self, ctx);
    }
    return ctx;
  };
};
util.inherits(Generator, yeoman.Base);