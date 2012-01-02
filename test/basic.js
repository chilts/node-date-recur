// --------------------------------------------------------------------------------------------------------------------
//
// basic.js - basic tests for date-recur
//
// Copyright (c) 2011 AppsAttic Ltd - http://www.appsattic.com/
// Written by Andrew Chilton <chilts@appsattic.com>
//
// License: http://opensource.org/licenses/MIT
//
// --------------------------------------------------------------------------------------------------------------------

var tap = require("tap"),
    test = tap.test,
    plan = tap.plan;
var recur;

// --------------------------------------------------------------------------------------------------------------------

test("load recur", function (t) {
    recur = require('../date-recur');
    t.ok(recur, 'object loaded');
    t.end();
});

test("no start or end date", function(t) {
    var r = recur();

    // matches every single date from '0000-01-01' to '9999-12-31'
    var dates = [ '2012-01-02', '1998-01-01', '2038-01-19' ];
    dates.forEach(function(v) {
        t.ok(r.matches(v), 'matches ' + v);
    });

    t.end();
});

test("start date only", function(t) {
    // two ways of setting the start date
    var r1 = recur({ start : '2012-01-02' });
    var r2 = recur().start('2012-01-02');
    var r3 = recur('2012-01-02');

    // matches every single date from '2012-01-02' to '9999-12-31'
    [ r1, r2, r3 ].forEach(function(v) {
        t.notOk(v.matches('2012-01-01'), 'does not match day before start');
        t.ok(v.matches('2012-01-02'), 'matches start');
        t.ok(v.matches('2012-01-03'), 'matches day after start');
    });

    t.end();
});

test("end date only", function(t) {
    // two ways of setting the end date
    var r1 = recur({ end : '2012-01-02' });
    var r2 = recur().end('2012-01-02');
    var r3 = recur(null, '2012-01-02');

    // matches every single date from '0000-01-01' to '2012-01-02'
    [ r1, r2, r3 ].forEach(function(v) {
        t.ok(v.matches('2012-01-01'), 'matches day before end');
        t.ok(v.matches('2012-01-02'), 'matches end');
        t.notOk(v.matches('2012-01-03'), 'does not match day after end');
    });

    t.end();
});

test("start and end date only", function(t) {
    // two ways of setting the end date
    var r1 = recur({ start : '2012-01-02', end : '2012-01-04' });
    var r2 = recur().start('2012-01-02').end('2012-01-04');
    var r3 = recur('2012-01-02', '2012-01-04');

    // matches only three days in the middle
    [ r1, r2, r3 ].forEach(function(v) {
        t.notOk(v.matches('2012-01-01'), 'does not match day before start');
        t.ok(v.matches('2012-01-02'), 'matches start day');
        t.ok(v.matches('2012-01-03'), 'matches middle day');
        t.ok(v.matches('2012-01-04'), 'matches end day');
        t.notOk(v.matches('2012-01-05'), 'does not match day after end');
    });

    t.end();
});

// --------------------------------------------------------------------------------------------------------------------
