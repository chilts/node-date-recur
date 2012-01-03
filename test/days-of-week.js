// --------------------------------------------------------------------------------------------------------------------
//
// days-of-week.js - tests for which days of the week a recurrence can fall
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

test("just Saturday and Sunday", function(t) {
    var r = recur().setDaysOfWeek({ 6 : true, 0 : true });

    t.ok(r.matches('2012-01-01'), 'first day of the month is a Sunday');
    t.notOk(r.matches('2012-01-02'), 'does not match the 2nd, a Monday');
    t.notOk(r.matches('2012-01-03'), 'does not match the 3rd, a Tuesday');
    t.notOk(r.matches('2012-01-04'), 'does not match the 4th, a Wednesday');
    t.notOk(r.matches('2012-01-05'), 'does not match the 5th, a Thursday');
    t.notOk(r.matches('2012-01-06'), 'does not match the 6th, a Friday');
    t.ok(r.matches('2012-01-07'), '7th day of month is a Saturday');

    t.end();
});

test("test the weekdays", function(t) {
    var r = recur().setDaysOfWeek([ 1, 2, 3, 4, 5 ]);

    t.notOk(r.matches('2012-01-01'), 'does not match a Sunday');
    t.ok(r.matches('2012-01-02'), 'matches Monday');
    t.ok(r.matches('2012-01-03'), 'matches Tuesday');
    t.ok(r.matches('2012-01-04'), 'matches Wednesday');
    t.ok(r.matches('2012-01-05'), 'matches Thursday');
    t.ok(r.matches('2012-01-06'), 'matches Friday');
    t.notOk(r.matches('2012-01-07'), 'does not match a Saturday');

    t.end();
});

// --------------------------------------------------------------------------------------------------------------------
