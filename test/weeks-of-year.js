// --------------------------------------------------------------------------------------------------------------------
//
// weeks-of-year.js - tests for which weeks of the year a recurrence can fall
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

test("First week (week 0) - start of week as Monday", function(t) {
    var r = recur().setWeeksOfYear(0);

    t.ok(r.matches('2012-01-01'), 'first day of 2012');
    t.notOk(r.matches('2012-01-02'), 'does not match 2nd day of 2012');

    t.ok(r.matches('2013-01-01'), 'first day of 2013');
    t.ok(r.matches('2013-01-06'), '6th day of 2013');
    t.notOk(r.matches('2013-01-07'), 'does not match 7th day of the year');

    t.end();
});

test("Last week (week 52) - start of week as Sunday", function(t) {
    var r = recur().setWeeksOfYear(0).setStartOfWeek(0);

    t.ok(r.matches('2012-01-01'), 'first day of 2012');
    t.ok(r.matches('2012-01-07'), '7th day of 2012');
    t.notOk(r.matches('2012-01-08'), 'does not match 8th day of 2012');

    t.ok(r.matches('2013-01-01'), 'first day of 2013');
    t.ok(r.matches('2013-01-05'), '5th day of 2013');
    t.notOk(r.matches('2013-01-06'), 'does not match 6th day of the year');

    t.end();
});

// --------------------------------------------------------------------------------------------------------------------
