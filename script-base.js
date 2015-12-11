'use strict';
var fs = require('fs')
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var debug = require('debug')('generator:xrm');
var chalk = require('chalk');
var Location = require('./util').Location;

var Generator = module.exports = function Generator() {
  // console.log(this._moduleName, arguments);
  var location = null;
  if (Array.isArray(arguments[1])) {
    location = arguments[1][0];
    arguments[1] = arguments[1][1];
  } else {
    location = new Location();
  }
  var ctx = {};
  var a = arguments[0];
  if (typeof a[0] === 'undefined') {
    a = arguments[1];
    ctx = a.ctx || {};
    debug(this._moduleName + ' from parent: ' + ctx.name);
  } else if (typeof a[0] != 'string') {
    ctx = a[0] || {};
    arguments[0].shift();
    debug(this._moduleName + ' from ctx: ' + ctx.name);
  } else {
    var name = null;
    try {
      var filePath = path.join(process.cwd(), a[0] + '.json');
      name = path.basename(filePath, '.json');
      ctx = eval('[' + fs.readFileSync(filePath, 'utf8') + ']')[0];
      ctx.name = name;
      debug(this._moduleName + ' from file: ' + ctx.name);
    } catch (e) { debug('An error occured while running ' + name, e); this.log(chalk.bold(e)); }
  }
  yeoman.generators.Base.apply(this, arguments);
  this.options.ctx = ctx;
  this.location = location;
};

util.inherits(Generator, yeoman.generators.NamedBase);

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