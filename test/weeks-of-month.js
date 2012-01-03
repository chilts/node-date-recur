// --------------------------------------------------------------------------------------------------------------------
//
// weeks-of-month.js - tests for which weeks of the month a recurrence can fall
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

test("zeroth week of each month (start of week is Sunday)", function(t) {
    var r = recur().setWeeksOfMonth(0).setStartOfWeek(0);

    t.ok(r.matches('2012-01-01'), 'first Jan 2012');
    t.ok(r.matches('2012-01-07'), '7th Jan 2012');
    t.notOk(r.matches('2012-01-08'), 'does not match 8th Jan 2012');

    t.ok(r.matches('2012-02-01'), 'first Feb 2012');
    t.ok(r.matches('2012-02-04'), '4th Feb 2012');
    t.notOk(r.matches('2012-02-05'), 'does not match 5th Feb 2012');

    t.ok(r.matches('2012-03-01'), 'first Mar 2012');
    t.ok(r.matches('2012-03-03'), '4th Mar 2012');
    t.notOk(r.matches('2012-03-05'), 'does not match 5th Mar 2012');

    t.end();
});

test("1st and 3rd weeks of each month (start of week is sunday)", function(t) {
    var r = recur().setWeeksOfMonth([ 1, 3 ]).setStartOfWeek(0);

    // Jan - week 1
    t.notOk(r.matches('2012-01-07'), 'does not match 7th Jan 2012');
    t.ok(r.matches('2012-01-08'), '8th Jan 2012');
    t.ok(r.matches('2012-01-14'), '14th Jan 2012');
    t.notOk(r.matches('2012-01-15'), 'does not match 15th Jan 2012');

    // Jan - week 3
    t.notOk(r.matches('2012-01-21'), 'does not match 21st Jan 2012');
    t.ok(r.matches('2012-01-22'), '22nd Jan 2012');
    t.ok(r.matches('2012-01-28'), '28th Jan 2012');
    t.notOk(r.matches('2012-01-29'), 'does not match 29th Jan 2012');

    // Feb - week 1
    t.notOk(r.matches('2012-02-04'), 'does not match 4th Feb 2012');
    t.ok(r.matches('2012-02-05'), '5th Feb 2012');
    t.ok(r.matches('2012-02-11'), '11th Feb 2012');
    t.notOk(r.matches('2012-02-12'), 'does not match 12th Feb 2012');

    // Feb - week 3
    t.notOk(r.matches('2012-02-18'), 'does not match 18th Feb 2012');
    t.ok(r.matches('2012-02-19'), '19nd Feb 2012');
    t.ok(r.matches('2012-02-25'), '25th Feb 2012');
    t.notOk(r.matches('2012-02-26'), 'does not match 26th Feb 2012');

    // Mar - week 1
    t.notOk(r.matches('2012-03-03'), 'does not match 3th Mar 2012');
    t.ok(r.matches('2012-03-04'), '4th Mar 2012');
    t.ok(r.matches('2012-03-10'), '10th Mar 2012');
    t.notOk(r.matches('2012-03-11'), 'does not match 11th Mar 2012');

    // Mar - week 3
    t.notOk(r.matches('2012-03-17'), 'does not match 17th Mar 2012');
    t.ok(r.matches('2012-03-18'), '18th Mar 2012');
    t.ok(r.matches('2012-03-24'), '24th Mar 2012');
    t.notOk(r.matches('2012-03-25'), 'does not match 25th Mar 2012');

    t.end();
});

// --------------------------------------------------------------------------------------------------------------------
