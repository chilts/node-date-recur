// --------------------------------------------------------------------------------------------------------------------
//
// months-of-year.js - tests for which months of the year a recurrence can fall
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

test("First quarter", function(t) {
    var r = recur().setMonthsOfYear([ recur.January, recur.Feb, recur.march ]);

    t.ok(r.matches('2012-01-01'), 'first day of the year');
    t.ok(r.matches('2012-03-31'), 'last day of the quarter');
    t.ok(r.matches('2012-02-14'), 'Valentine\'s Day');

    t.notOk(r.matches('2012-04-01'), 'does not match first day of 2nd quarter');
    t.notOk(r.matches('2012-12-31'), 'does not match last day of the year');

    t.end();
});

test("just December", function(t) {
    var r = recur().setMonthsOfYear({ 12 : true });

    t.ok(r.matches('2012-12-01'), '1st of December');
    t.ok(r.matches('2012-12-25'), 'Christmas Day');
    t.ok(r.matches('2012-12-31'), 'New Year\'s Eve');

    t.notOk(r.matches('2012-01-01'), 'does not match first day of the year');
    t.notOk(r.matches('2012-11-30'), 'does not match last day of November');

    t.end();
});

// --------------------------------------------------------------------------------------------------------------------
