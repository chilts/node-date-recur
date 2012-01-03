// --------------------------------------------------------------------------------------------------------------------
//
// days-of-month.js - tests for which days of the month a recurrence can fall
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
var recur = require('../date-recur');

// --------------------------------------------------------------------------------------------------------------------

test("first week of each month", function(t) {
    var r = recur().setDaysOfMonth([1, 2, 3, 4, 5, 6, 7]);

    t.ok(r.matches('2012-01-01'), 'first day of the month');
    t.ok(r.matches('2012-01-04'), '3rd day of the month');
    t.ok(r.matches('2012-01-07'), '7th day of the month');
    t.notOk(r.matches('2012-01-08'), '8th day of the month');

    t.ok(r.matches('1666-12-01'), 'first day of the month');
    t.ok(r.matches('1666-12-04'), '3rd day of the month');
    t.ok(r.matches('1666-12-07'), '7th day of the month');
    t.notOk(r.matches('1666-12-08'), '8th day of the month');

    t.ok(r.matches('2032-07-01'), 'first day of the month');
    t.ok(r.matches('2032-07-03'), '3rd day of the month');
    t.ok(r.matches('2032-07-07'), '7th day of the month');
    t.notOk(r.matches('2032-07-08'), '8th day of the month');

    t.end();
});

test("test the 13th and 20th of each month", function(t) {
    var r = recur().setDaysOfMonth({ 13 : true, 20 : true });

    t.notOk(r.matches('2012-01-01'), 'does not match first day of the month');
    t.notOk(r.matches('2012-01-12'), 'does not match 12th day of the month');
    t.ok(r.matches('2012-01-13'), '13th day of the month');
    t.notOk(r.matches('2012-01-14'), 'does not match 14th day of the month');
    t.notOk(r.matches('2012-01-19'), 'does not match 19th day of the month');
    t.ok(r.matches('2012-01-20'), '20th day of the month');
    t.notOk(r.matches('2012-01-21'), 'does not match 21st day of the month');

    t.end();
});

test("test the 7th of each month", function(t) {
    var r = recur().setDaysOfMonth(7);

    t.notOk(r.matches('2012-01-01'), 'does not match first day of the month');
    t.ok(r.matches('2012-01-07'), '7th day of the month');
    t.notOk(r.matches('2012-01-14'), 'does not match 14th day of the month');

    t.end();
});

// --------------------------------------------------------------------------------------------------------------------
