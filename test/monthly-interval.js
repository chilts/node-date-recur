// --------------------------------------------------------------------------------------------------------------------
//
// monthly-interval.js - tests for monthly intervals
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

test("interval of 2 months", function(t) {
    var r = recur('2012-01-02').setMonthlyInterval(2);

    t.notOk(r.matches('2012-01-01'), 'does not match day before start');
    t.ok(r.matches('2012-01-02'), 'matches start day');
    t.ok(r.matches('2012-01-31'), 'matches last day of start day month');
    t.notOk(r.matches('2012-02-01'), 'does not match start of next month');
    t.notOk(r.matches('2012-02-28'), 'does not match end of next month');
    t.ok(r.matches('2012-03-01'), 'matches first day of month in 2 months time');
    t.ok(r.matches('2012-03-31'), 'matches last day of month in 2 months time');

    t.end();
});

test("interval of 12 months (1 year)", function(t) {
    var r = recur('2012-01-01').setMonthlyInterval(12);

    t.notOk(r.matches('2011-01-01'), 'does not match year before start');
    t.notOk(r.matches('2011-12-31'), 'does not match day before start');
    t.ok(r.matches('2012-01-01'), 'matches start day');
    t.ok(r.matches('2012-01-31'), 'matches last day of start day month');
    t.notOk(r.matches('2012-12-31'), 'does not match last day of year');
    t.ok(r.matches('2013-01-01'), 'matches first day of next year');

    t.end();
});

test("interval of 3 months (for half a year only)", function(t) {
    var r = recur('2012-01-01', '2012-06-30').setMonthlyInterval(3);

    t.notOk(r.matches('2011-10-02'), 'does not match 3 months before start');
    t.notOk(r.matches('2011-12-31'), 'does not match day before start');
    t.ok(r.matches('2012-01-02'), 'matches start day');
    t.ok(r.matches('2012-01-31'), 'matches last day of start day month');
    t.notOk(r.matches('2012-03-31'), 'does not match last day of 3rd month');
    t.ok(r.matches('2012-04-01'), 'matches first day of 4th month day month');
    t.ok(r.matches('2012-04-30'), 'matches last day of 4th month day month');
    t.notOk(r.matches('2012-05-31'), 'does not match first day of 5th month');
    t.notOk(r.matches('2012-07-01'), 'does not match first day of 7th month');

    t.end();
});

// --------------------------------------------------------------------------------------------------------------------
