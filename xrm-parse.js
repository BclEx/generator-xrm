'use strict';
var _ = require('lodash');
var fs = require('fs')
var path = require('path');
var debug = require('debug')('generator:xrm');
var chalk = require('chalk');
var g_cache = [];

// bind-ctx
function bindCtx(ctx) {
  _.extend(ctx, CtxMethods);
  ctx.root = this;
  ctx.log = this.log;
  ctx.searchPaths = ctx.searchPaths || [process.cwd()];
  ctx.schemaName = ctx.schemaName || '';
  ctx.name = ctx.name || 'entity';
  ctx.id = _.camelCase(ctx.Id = ctx.name + 'Id');
  g_cache[ctx.schemaName + '.' + ctx.name] = ctx;

  // relations
  if (ctx.hasOwnProperty('relations')) {
    if (!_.isArray(ctx.relations)) {
      this.log(chalk.bold('ERR! ' + chalk.green(this.name + ': { relations: }') + ' not array'));
      return null;
    }
    for (var i = 0; i < ctx.relations.length; ++i) {
      var relation = ctx.relations[i];
      bindRelation.call(ctx, relation);
    }
  }

  // fields
  var fields = {
    // EntityId
    CreatedOn: bindField.call(ctx, { label: 'Created On', name: 'CreatedOn', datetime: {} }, 1),
    CreatedBy: bindField.call(ctx, { label: 'Created By', name: 'CreatedBy', lookup: { relatedTo: 'SystemUser' } }, 1),
    ModifiedOn: bindField.call(ctx, { label: 'Modified On', name: 'ModifiedOn', datetime: {} }, 1),
    ModifiedBy: bindField.call(ctx, { label: 'Modified By', name: 'ModifiedBy', lookup: { relatedTo: 'SystemUser' } }, 1),
  };
  if (ctx.hasOwnProperty('recordTypes')) {
    if (!_.isArray(ctx.recordTypes)) {
      this.log(chalk.bold('ERR! ' + chalk.green(this.name + ': { recordTypes: }') + ' not array'));
      return null;
    }
    fields['RecordType'] = bindField.call(ctx, { label: 'Record Type', name: 'RecordType', picklist: { values: ctx.recordTypes, length: 160, defaultFirst: true } }, 1);
  }
  //
  if (!_.isArray(ctx.fields)) {
    this.log(chalk.bold('ERR! ' + chalk.green(this.name + ': { fields: }') + ' not array'));
    return null;
  }
  for (var i = 0; i < ctx.fields.length; ++i) {
    var field = ctx.fields[i];
    fields[field.name] = bindField.call(ctx, field, 2);
  }
  ctx.fields = fields;
  // layouts
  var layouts = {};
  if (!_.isArray(ctx.layouts)) {
    this.log(chalk.bold('ERR! ' + chalk.green(this.name + ': { layouts: }') + ' not array'));
    return null;
  }
  for (var i = 0; i < ctx.layouts.length; ++i) {
    var layout = ctx.layouts[i];
    layouts[layout.name] = bindLayout.call(ctx, layout);
  }
  ctx.layouts = layouts;

  // lists
  var lists = {};
  if (!_.isArray(ctx.lists)) {
    this.log(chalk.bold('ERR! ' + chalk.green(this.name + ': { lists: }') + ' not array'));
    return null;
  }
  for (var i = 0; i < ctx.lists.length; ++i) {
    var list = ctx.lists[i];
    lists[list.name] = bindList.call(ctx, list);
  }
  ctx.lists = lists;
}
var CtxMethods = {
  getCtx: function getCtx(name) {
    var parts = getObjectNameParts(this.schemaName, name);
    if (g_cache.hasOwnProperty(parts[0] + parts[1])) {
      return g_cache[parts[0] + parts[1]];
    }
    var ctx = loadCtx.call(this.root, parts);
    if (!ctx) {
      console.log('Unable to load ' + name);
      return null;
    }
    return ctx;
  },
  getFields: function getFields(flag) {
    return _.pick(this.fields, function (value, key) {
      return (value.flag & flag) != 0;
    });
  },
  missingField: function missingField(name) {
    this.log(chalk.bold('ERR! ' + chalk.green('field[' + name + ']') + ' not found'));
  },
  missingLayout: function missingLayout(name) {
    this.log(chalk.bold('ERR! ' + chalk.green('layout[' + name + ']') + ' not found'));
  },
  missingList: function missingList(name) {
    this.log(chalk.bold('ERR! ' + chalk.green('list[' + name + ']') + ' not found'));
  },
  getLayouts: function getLayouts() {
    return this.layouts;
  },
  getLists: function getLists() {
    return this.lists;
  },
  getDisplayField: function getDisplayField() {
    var foundId = 0; var foundField = null;
    _.forEach(this.fields, function (field) {
      if (field.hasOwnProperty('display')) {
        foundId = 3; foundField = field;
      } else if (foundId < 3 && field.name == 'Name') {
        foundId = 2; foundField = field;
      } else if (foundId < 2 && field.name == 'Title') {
        foundId = 1; foundField = field;
      }
    });
    return foundField;
  },
};


// bind-relation
function bindRelation(relation) {
  if (!relation.name) {
    this.log(chalk.bold('ERR! ' + chalk.green(this.name + ': { relation.name: }') + ' not defined'));
    return null;
  }
  _.extend(relation, RelationMethods);
  if (!relation.relatedTo) {
    this.log(chalk.bold('ERR! ' + chalk.green(this.name + ': { relation.relatedTo: }') + ' not defined'));
    return null;
  }
  relation.relatedTo = getObjectNameParts(this.schemaName, relation.relatedTo);
  return relation;
}
var RelationMethods = {
};


// bind-field
function bindField(field, flag) {
  if (!field.name) {
    this.log(chalk.bold('ERR! ' + chalk.green(this.name + ': { field.name: }') + ' not defined'));
    return null;
  }
  _.extend(field, FieldMethods);
  if (field.hasOwnProperty('lookup')) {
    field.id = _.camelCase(field.Id = field.name + 'Id');
    field.lookup.relatedTo = getObjectNameParts(this.schemaName, field.lookup.relatedTo);
  } else if (field.hasOwnProperty('masterDetail')) {
    field.id = _.camelCase(field.Id = field.name + 'Id');
    field.masterDetail.relatedTo = getObjectNameParts(this.schemaName, field.masterDetail.relatedTo);
  } else {
    field.id = _.camelCase(field.Id = field.name);
  }
  field.flag = flag;
  return field;
}
var FieldMethods = {
};


// bind-layout
function bindLayout(layout) {
  if (!layout.name) {
    this.log(chalk.bold('ERR! ' + chalk.green(this.name + ': { layout.name: }') + ' not defined'));
    return null;
  }
  _.extend(layout, LayoutMethods);
  layout.id = _.camelCase(layout.Id = layout.name);
  return layout;
}
var LayoutMethods = {
};


// bind-list
function bindList(list) {
  if (!list.name) {
    this.log(chalk.bold('ERR! ' + chalk.green(this.name + ': { list.name: }') + ' not defined'));
    return null;
  } else if (!list.l) {
    this.log(chalk.bold('ERR! ' + chalk.green(this.name + '.' + list.name + ': { list.l: }') + ' not found'));
    return null;
  }
  _.extend(list, ListMethods);
  list.id = _.camelCase(list.Id = list.name);
  return list;
}
var ListMethods = {
};


// load-ctx
function loadCtx(nameParts) {
  var ctxName = nameParts[0] + nameParts[1];
  debug('load-ctx: ' + ctxName);
  // this.log(chalk.bold(chalk.green(ctxName)));
  var filePath = null;
  _.forEach(this.ctx.searchPaths, function (x) {
    var ctxPath = path.join(x, ctxName + '.js');
    if (fs.existsSync(ctxPath)) {
      filePath = ctxPath;
      return;
    }
  });
  if (!filePath) {
    return null;
  }
  var ctx = eval('[' + fs.readFileSync(filePath, 'utf8') + ']')[0];
  ctx.searchPaths = [path.dirname(filePath)];
  ctx.schemaName = nameParts[0];
  ctx.name = nameParts[1];
  bindCtx.call(this, ctx);
  return ctx;
}


// util
function getObjectNameParts(schemaName, objectName) {
  var pieces = undefined;
  if (_.isString(objectName)) {
    pieces = objectName.split('.');
  }
  if (!pieces || pieces.length === 1) {
    return [schemaName + '.', pieces ? pieces[0] : objectName];
  }
  return [pieces[0] + '.', pieces[1]];
}

module.exports = {
  bindCtx: bindCtx,
};