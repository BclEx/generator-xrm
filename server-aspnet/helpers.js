'use strict';
var _ = require('lodash');

function toQuery(node) {
  var sql = node.toQuery();
  return sql;
}

exports.toQuery = toQuery;