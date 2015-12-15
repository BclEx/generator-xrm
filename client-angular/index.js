/*
 * grunt-xml
 * https://gruntjs.com/
 *
 * Copyright (c) 2015 Sky Morey, contributors
 * Licensed under the MIT license.
 */

'use strict';

// External libs.
var util = require('util');
var scriptBase = require('../script-base.js');
var yeoman = require('yeoman-generator');
var debug = require('debug')('generator:xrm');
var chalk = require('chalk');
var Location = require('../util').Location;
var _ = require('lodash');

var Generator = module.exports = function Generator() {
  this._moduleName = 'xrm:client-angular';
  scriptBase.apply(this, arguments);
  var done = this.async();
  this.on('end', function () {
    done();
  });
};

util.inherits(Generator, scriptBase);

Generator.prototype.createFiles = function createFiles() {
  debug('Defining client');
  var ctx = this.options.ctx;
  
  // ctx
  var entityName = ctx.name || 'entity';
  var fields = ctx.fields;
  if (!Array.isArray(fields)) {
    this.log(chalk.bold('ERR! ' + chalk.green('{ fields: }') + ' not array')); return null;
  }

  function hasOwnProperty(value) {
    return this.hasOwnProperty(value);
  }

  // build content
  var t0 = [];
  // fields.forEach(function (prop) {
  //   t0.push({ rule: '.' + propName, decls: { float: 'left', 'margin-right': '3%' } });
  // }
  fields.forEach(function (prop) {
    
    var propName = prop.name;
    if (!propName) {
      this.log(chalk.bold('ERR! ' + chalk.green(entityName + '.' + propName + ': { field.name: }') + ' not defined')); return null;
    }
    if (_.some(['autoNumber', 'formula', 'rollupSummary', 'externalLookup', ], hasOwnProperty, prop)) {
      t0.push({ rule: '.' + propName, decls: { width: '20%' } });
    } else if (_.some(['lookup', 'masterDetail'], hasOwnProperty, prop)) {
      t0.push({ rule: '.' + propName + 'Id', decls: { width: '20%' } });
    } else if (prop.hasOwnProperty('checkbox')) {
      t0.push({ rule: '.' + propName, decls: { width: '20%' } });
    } else if (prop.hasOwnProperty('currency')) {
      t0.push({ rule: '.' + propName, decls: { width: '20%' } });
    } else if (_.some(['date', 'dateTime'], hasOwnProperty, prop)) {
      t0.push({ rule: '.' + propName, decls: { width: '20%' } });
    } else if (prop.hasOwnProperty('email')) {
      t0.push({ rule: '.' + propName, decls: { width: '20%' } });
    } else if (prop.hasOwnProperty('geolocation')) {
      t0.push({ rule: '.' + propName, decls: { width: '20%' } });
    } else if (prop.hasOwnProperty('number')) {
      t0.push({ rule: '.' + propName, decls: { width: '20%' } });
    } else if (prop.hasOwnProperty('percent')) {
      t0.push({ rule: '.' + propName, decls: { width: '20%' } });
    } else if (prop.hasOwnProperty('phone')) {
      t0.push({ rule: '.' + propName, decls: { width: '20%' } });
    } else if (prop.hasOwnProperty('picklist')) {
      t0.push({ rule: '.' + propName, decls: { width: '20%' } });
    } else if (_.some(['text', 'textArea', 'textAreaLong', 'textAreaRich', 'textEncrypted'], hasOwnProperty, prop)) {
      t0.push({ rule: '.' + propName, decls: { width: '20%' } });
    } else if (prop.hasOwnProperty('url')) {
      t0.push({ rule: '.' + propName, decls: { width: '20%' } });
    } else {
      this.log(chalk.bold('ERR! ' + chalk.green(entityName + '.' + propName + ': { field.prop: }') + ' css not matched')); return null;
    }
  }.bind(this));
  
  // build content
  var t1 = [];
  fields.forEach(function (prop) {
    
    var propName = prop.name;
    if (!propName) {
      this.log(chalk.bold('ERR! ' + chalk.green(entityName + '.' + propName + ': { field.name: }') + ' not defined')); return null;
    }

    if (_.some(['autoNumber', 'formula', 'rollupSummary', 'externalLookup'], hasOwnProperty, prop)) {
      //<div class="field firstName">
      //    <label for="firstName">Opportunity</label>
      //    <input name="firstName" type="text" name="data.firstName" ng-model="firstName" readonly />
      //</div>
      t1.push(function ($) { $('\
<div class="field ' + propName + '">\n\
    <label for="'+ propName + '">' + prop.label + '</label>\n\
    <input name="'+ propName + '" type="text" name="data.' + propName + '" ng-model="' + propName + '" readonly />\n\
</div>\n');
      });
    } else if (_.some(['lookup', 'masterDetail'], hasOwnProperty, prop)) {
      //<div class="field accountId">
      //    <label for="accountId">Account</label>
      //    <select name="accountId" ng-model="data.accountId" ng-required ng-options="jobStatus.name for jobStatus in jobStatuses" placeholder="Choose Status..." chosen>
      //        <option label=""></option>
      //    </select>
      //</div>
      t1.push(function ($) { $('\
          <div class="field ' + propName + '">\n\
              <label for="'+ propName + '">' + prop.label + '</label>\n\
              <select name="' + propName + '" name="data.' + propName + '" ng-required ng-options="jobStatus.name for jobStatus in jobStatuses" placeholder="Choose ' + prop.label + '..." chosen>\n\
                  <option label=""></option>\n\
              </select>\n\
          </div>\n');
      });
    } else if (prop.hasOwnProperty('checkbox')) {
      //<div class="field firstName">
      //    <label for="firstName">Opportunity</label>
      //    <input name="firstName" type="checkbox" name="data.firstName" ng-model="firstName" readonly />
      //</div>
      t1.push(function ($) { $('\
<div class="field ' + propName + '">\n\
    <label for="'+ propName + '">' + prop.label + '</label>\n\
    <input name="'+ propName + '" type="checkbox" name="data.' + propName + '" ng-model="' + propName + '" />\n\
</div>\n');
      });
    } else if (_.some(['currency', 'date', 'dateTime', 'email', 'geolocation', 'number', 'email', 'percent', 'phone', 'url'], hasOwnProperty, prop)) {
      //<div class="field firstName">
      //    <label for="firstName">Opportunity</label>
      //    <input name="firstName" type="[text/date/datetime/tel/url]" name="data.firstName" ng-model="firstName" readonly />
      //</div>
      var fieldType = null;
      if (prop.hasOwnProperty('currency')) fieldType = 'text';
      else if (prop.hasOwnProperty('date')) fieldType = 'date';
      else if (prop.hasOwnProperty('dateTime')) fieldType = 'datetime';
      else if (prop.hasOwnProperty('email')) fieldType = 'email';
      else if (prop.hasOwnProperty('geolocation')) fieldType = 'text';
      else if (prop.hasOwnProperty('number')) fieldType = 'text';
      else if (prop.hasOwnProperty('percent')) fieldType = 'text';
      else if (prop.hasOwnProperty('phone')) fieldType = 'tel';
      else if (prop.hasOwnProperty('url')) fieldType = 'url';
      t1.push(function ($) { $('\
<div class="field ' + propName + '">\n\
    <label for="'+ propName + '">' + prop.label + '</label>\n\
    <input name="'+ propName + '" type="'+ fieldType +'" name="data.' + propName + '" ng-model="' + propName + '" />\n\
</div>\n');
      });
    } else if (_.some(['picklist', 'picklistMulti'], hasOwnProperty, prop)) {
      //<div class="field status">
      //    <label for="status">Status</label>
      //    <select name="status" ng-model="data.status" ng-required ng-options="jobStatus.name for jobStatus in jobStatuses" placeholder="Choose Status..." chosen>
      //        <option label=""></option>
      //    </select>
      //</div>
      t1.push(function ($) { $('\
          <div class="field ' + propName + '">\n\
              <label for="'+ propName + '">' + prop.label + '</label>\n\
              <select name="' + propName + '" name="data.' + propName + '" ng-required ng-options="jobStatus.name for jobStatus in jobStatuses" placeholder="Choose ' + prop.label + '..." chosen>\n\
                  <option label=""></option>\n\
              </select>\n\
          </div>\n');
      });
    } else if (prop.hasOwnProperty('text')) {
      //<div class="field firstName">
      //    <label for="firstName">Opportunity</label>
      //    <input name="firstName" type="text" name="data.firstName" ng-model="firstName" readonly />
      //</div>
      t1.push(function ($) { $('\
<div class="field ' + propName + '">\n\
    <label for="'+ propName + '">' + prop.label + '</label>\n\
    <input name="'+ propName + '" type="text" name="data.' + propName + '" ng-model="' + propName + '" />\n\
</div>\n');
      });
    } else if (_.some(['textArea', 'textAreaLong', 'textAreaRich'], hasOwnProperty, prop)) {
      //<div class="field firstName">
      //    <label for="firstName">Opportunity</label>
      //    <textarea name="firstName" name="data.firstName" ng-model="firstName" readonly />
      //</div>
      t1.push(function ($) { $('\
<div class="field ' + propName + '">\n\
    <label for="'+ propName + '">' + prop.label + '</label>\n\
    <textarea name="'+ propName + '" name="data.' + propName + '" ng-model="' + propName + '" />\n\
</div>\n');
      });
    } else if (prop.hasOwnProperty('textEncrypted')) {
      //<div class="field firstName">
      //    <label for="firstName">Opportunity</label>
      //    <input name="firstName" type="text" name="data.firstName" ng-model="firstName" readonly />
      //</div>
      t1.push(function ($) { $('\
<div class="field ' + propName + '">\n\
    <label for="'+ propName + '">' + prop.label + '</label>\n\
    <input name="'+ propName + '" type="text" name="data.' + propName + '" ng-model="' + propName + '" />\n\
</div>\n');
      });
    } else {
      this.log(chalk.bold('ERR! ' + chalk.green(entityName + '.' + propName + ': { field.prop: }') + ' not matched')); return null;
    }
  }.bind(this));

  // var r = '\
  // <form name="jobEntry" ng-controller="JobEntryController as form" ng-submit="form.submit(jobEntry.$valid, data)">\n\
  //     <fieldset class="offical-use" ng-if="officalUse">\n\
  // '+ html0 + '\n\
  //     </fieldset>\n\
  // </form>';

  var locationHtml = this.location.html || new Location();
  var locationJs = this.location.jss || new Location();
  var locationCss = this.location.css || new Location();
  var htmlCtx = {
    _name: entityName,
    _file: locationHtml.getEnsuredPath(entityName, entityName + '-entry.cshtml'),
    html: function(args, $) {
      var form = $('\
<div ng-app="'+ entityName + 'Module">\n\
  <section class="form-entry ' + entityName + '-entry">\n\
    <form name="' + entityName + 'Entry" ng-controller="' + entityName + 'EntryController as form" ng-submit="form.submit(' + entityName + 'Entry.$valid, data)">\n\
      <fieldset>\n\
      </fieldset>\n\
    </form>\n\
  </section>\n\
</div>\n');
      $('html').append(form);
      return $;
    }
  };
  var cssCtx = {
    _name: entityName,
    _file: locationJs.getEnsuredPath('css/partials', '_' + entityName + '-entry.scss'),
    createCss: {}
  };
  var jsCtx = {
    _name: entityName,
    _file: locationCss.getEnsuredPath('src/modules', entityName + 'Module.js'),
  };
  //console.log(htmlCtx);
  this.composeWith('fragment:html', { options: { ctx: htmlCtx } });
  //this.composeWith('fragment:css', { options: { ctx: cssCtx } });
  //this.composeWith('fragment:js', { options: { ctx: jsCtx } });
};
