'use strict';

var fs = require('fs');
var path = require('path');
var assert = require('yeoman-generator').assert;
var Theme = require('../theme-slds');

var theme;
describe('theme-slds test', function() {
    before(function(done) {
        theme = new Theme('Sample'); //, console.log);
        done();
    });

    describe('box', function() {
        it('can build header', function(done) {
            var s = [[]];
            theme.buildHeader(s); //s[0][0](console.log);
            assert(s[0].length == 1);
            done();
        });
        it('can build footer', function(done) {
            var s = [[]];
            theme.buildFooter(s); //s[0][0](console.log);
            assert(s[0].length == 1);
            done();
        });
    });

    describe('detail', function() {
        it('can build header', function(done) {
            var s = [[]];
            theme.buildDetailHeader(s); //s[0][0](console.log);
            assert(s[0].length == 1);
            done();
        });
    });
    describe('list', function() {
        it('can build header', function(done) {
            var s = [[]];
            theme.buildListHeader(s); //s[0][0](console.log);
            assert(s[0].length == 1);
            done();
        });
    });

    describe('element', function() {
        it('returns false if has no name', function(done) {
            var s = [[]];
            var r = theme.buildElement(s, {});
            assert(!r);
            done();
        });
        it('returns false if has no prop', function(done) {
            var s = [[]];
            var r = theme.buildElement(s, { name: 'first' });
            assert(!r);
            done();
        });
        it('return true and builds autoNumber:element', function(done) {
            var s = [[]];
            var r = theme.buildElement(s, { name: 'autoNumber', autoNumber: '', label: 'Name' }); //s[0][0](console.log);
            assert(r);
            assert(s[0].length == 1);
            done();
        });
        it('returns true and builds lookup:element', function(done) {
            var s = [[]];
            var r = theme.buildElement(s, { name: 'lookup', lookup: 'lookup', label: 'Name' }); //s[0][0](console.log);
            assert(r);
            assert(s[0].length == 1);
            done();
        });
        it('returns true and builds checkbox:element', function(done) {
            var s = [[]];
            var r = theme.buildElement(s, { name: 'checkbox', checkbox: '', label: 'Name' }); //s[0][0](console.log);
            assert(r);
            assert(s[0].length == 1);
            done();
        });
        it('returns true and builds currency:element', function(done) {
            var s = [[]];
            var r = theme.buildElement(s, { name: 'currency', currency: '', label: 'Name' }); //s[0][0](console.log);
            assert(r);
            assert(s[0].length == 1);
            done();
        });
        it('returns true and builds picklist:element', function(done) {
            var s = [[]];
            var r = theme.buildElement(s, { name: 'picklist', picklist: '', label: 'Name' }); //s[0][0](console.log);
            assert(r);
            assert(s[0].length == 1);
            done();
        });
        it('returns true and builds picklistMulti:element', function(done) {
            var s = [[]];
            var r = theme.buildElement(s, { name: 'picklistMulti', picklistMulti: '', label: 'Name' }); //s[0][0](console.log);
            assert(r);
            assert(s[0].length == 1);
            done();
        });
        it('returns true and builds textArea:element', function(done) {
            var s = [[]];
            var r = theme.buildElement(s, { name: 'textArea', textArea: '', label: 'Name' }); //s[0][0](console.log);
            assert(r);
            assert(s[0].length == 1);
            done();
        });
        it('returns true and builds textEncrypted:element', function(done) {
            var s = [[]];
            var r = theme.buildElement(s, { name: 'textEncrypted', textEncrypted: '', label: 'Name' }); //s[0][0](console.log);
            assert(r);
            assert(s[0].length == 1);
            done();
        });
    });

    describe('fields', function() {
        it('returns false if has no name', function(done) {
            var s = [[]];
            var e = [
                { name: 'text', text: '', label: 'Name' },
                { name: 'checkbox', checkbox: '', label: 'Name' },
                { name: 'lookup', lookup: 'lookup', label: 'Name' }
            ];
            var r = theme.buildAllElements(s, e);
            assert(!r);
            done();
        });
    });

});
