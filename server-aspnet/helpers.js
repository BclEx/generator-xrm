'use strict';

exports.toQuery = toQuery;

var _ = require('lodash');

function toQuery(node) {
  var sql = node.toQuery();
  return sql;
}

