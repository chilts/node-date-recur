// --------------------------------------------------------------------------------------------------------------------
//
// weekly-interval.js - tests for weekly intervals
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

test("interval of 2 weeks", function(t) {
    var r = recur('2012-01-03').setWeeklyInterval(2);

    t.notOk(r.matches('2012-01-02'), 'does not match day before start');

    t.ok(r.matches('2012-01-03'), 'matches start week');
    t.ok(r.matches('2012-01-04'), 'matches start week');
    t.ok(r.matches('2012-01-05'), 'matches start week');
    t.ok(r.matches('2012-01-06'), 'matches start week');
    t.ok(r.matches('2012-01-07'), 'matches start week');
    t.ok(r.matches('2012-01-08'), 'matches start week');

    t.notOk(r.matches('2012-01-09'), 'does not match next week');
    t.notOk(r.matches('2012-01-10'), 'does not match next week');
    t.notOk(r.matches('2012-01-11'), 'does not match next week');
    t.notOk(r.matches('2012-01-12'), 'does not match next week');
    t.notOk(r.matches('2012-01-13'), 'does not match next week');
    t.notOk(r.matches('2012-01-14'), 'does not match next week');
    t.notOk(r.matches('2012-01-15'), 'does not match next week');

    t.ok(r.matches('2012-01-16'), 'matches following week');
    t.ok(r.matches('2012-01-17'), 'matches following week');
    t.ok(r.matches('2012-01-18'), 'matches following week');
    t.ok(r.matches('2012-01-19'), 'matches following week');
    t.ok(r.matches('2012-01-20'), 'matches following week');
    t.ok(r.matches('2012-01-21'), 'matches following week');

    t.end();
});

test("interval of 2 weeks (start of week on Sunday)", function(t) {
    var r = recur('2012-01-03').setWeeklyInterval(2);

    // Sunday
    r.setStartOfWeek(0);

    t.notOk(r.matches('2012-01-02'), 'does not match day before start');

    t.ok(r.matches('2012-01-03'), 'matches start week');
    t.ok(r.matches('2012-01-04'), 'matches start week');
    t.ok(r.matches('2012-01-05'), 'matches start week');
    t.ok(r.matches('2012-01-06'), 'matches start week');
    t.ok(r.matches('2012-01-07'), 'matches start week');

    t.notOk(r.matches('2012-01-08'), 'does not match next week');
    t.notOk(r.matches('2012-01-09'), 'does not match next week');
    t.notOk(r.matches('2012-01-10'), 'does not match next week');
    t.notOk(r.matches('2012-01-11'), 'does not match next week');
    t.notOk(r.matches('2012-01-12'), 'does not match next week');
    t.notOk(r.matches('2012-01-13'), 'does not match next week');
    t.notOk(r.matches('2012-01-14'), 'does not match next week');

    t.ok(r.matches('2012-01-15'), 'matches following week');
    t.ok(r.matches('2012-01-16'), 'matches following week');
    t.ok(r.matches('2012-01-17'), 'matches following week');
    t.ok(r.matches('2012-01-18'), 'matches following week');
    t.ok(r.matches('2012-01-19'), 'matches following week');
    t.ok(r.matches('2012-01-20'), 'matches following week');
    t.ok(r.matches('2012-01-21'), 'matches following week');

    t.end();
});

// --------------------------------------------------------------------------------------------------------------------
