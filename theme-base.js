'use strict';
var debug = require('debug')('generator:xrm-core');

var Theme = module.exports = function Theme() {
    this.entityName = arguments[0];
    this.log = (arguments[1] ? arguments[1] : function() {});
};

// function hasOwnProperty(value) {
//     return this.hasOwnProperty(value);
// }