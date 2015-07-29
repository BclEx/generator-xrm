'use strict';
var fs = require('fs')
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var Generator = module.exports = function Generator() {
  var a = arguments[0];
  // parse args/file
  var args = {};
  if (typeof a[0] != 'string') {
    args = a[0] || {};
    arguments[0].shift();
  } else {
    try {
      var filePath = path.join(process.cwd(), a[0] + '.json');
      args = eval('[' + fs.readFileSync(filePath, 'utf8') + ']')[0];
    } catch (e) { this.log(chalk.bold(e)); }
  }
  yeoman.generators.Base.apply(this, arguments);
  this.options.args = args;
};

util.inherits(Generator, yeoman.generators.NamedBase);
