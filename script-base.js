'use strict';
var _ = require('lodash');
var fs = require('fs')
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var debug = require('debug')('generator:xrm');
var chalk = require('chalk');
var Location = require('./util').Location;
var XrmParse = require('./xrm-parse');

var Generator = module.exports = function Generator() {
  //debug(this._moduleName, arguments);
  console.log(this);
  var ctx = {};
  var location = null;
  var a = arguments[0];
  if (typeof a[0] === 'undefined') {
    a = arguments[1];
    ctx = a.ctx || {};
    location = a.location;
    debug(this._moduleName + ' from parent: ' + ctx.name);
  } else if (typeof a[0] != 'string') {
    ctx = a[0] || {};
    arguments[0].shift();
    debug(this._moduleName + ' from ctx: ' + ctx.name);
  } else {
    var name = null;
    try {
      var filePath = path.join(process.cwd(), a[0] + '.js');
      var nameParts = getObjectNameParts(path.basename(filePath, '.js'));
      ctx = eval('[' + fs.readFileSync(filePath, 'utf8') + ']')[0];
      ctx.searchPaths = [path.dirname(filePath)];
      ctx.schemaName = nameParts[0];
      ctx.name = nameParts[1];
      debug(this._moduleName + ' from file: ' + ctx.name);
    } catch (e) { debug('An error occured while running ' + name, e); this.log(chalk.bold(e)); }
  }
  yeoman.generators.Base.apply(this, arguments);
  this.ctx = ctx;
  this.location = location;
  if (!ctx.Id) {
    XrmParse.bindCtx.call(this, ctx);
  }
};
util.inherits(Generator, yeoman.generators.NamedBase);

function getObjectNameParts(objectName) {
  var pieces = objectName.split('.');
  if (!pieces || pieces.length === 1) {
    return ['dbo', pieces ? pieces[0] : objectName];
  }
  return [pieces[0], pieces[1]];
}

// Generator.prototype._setDestinationRoot = function (subPath) {
//   console.log('sdr:', subPath);
//   if (this._originalDestinationRoot) {
//     this.destinationRoot(this._originalDestinationRoot);
//   } else {
//     this._originalDestinationRoot = this.destinationRoot();
//   }
//   if (subPath) {
//     var newPath = this.destinationPath(subPath);
//     console.log(newPath);
//     if (!fs.existsSync(newPath)) {
//       fs.mkdirSync(newPath);
//     }
//     this.destinationRoot(newPath);
//   }
// };
// 
// Generator.prototype._ensurePath = function (subPath, file) {
//   console.log('ep:', subPath, file);
//   var newPath = this.destinationPath(subPath);
//   console.log(newPath);
//   if (!fs.existsSync(newPath)) {
//     fs.mkdirSync(newPath);
//   }
//   return path.join(newPath, file);
// };