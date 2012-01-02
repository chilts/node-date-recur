// --------------------------------------------------------------------------------------------------------------------
//
// daily-interval.js - tests for daily intervals
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

test("interval of 2 days", function(t) {
    var r = recur('2012-01-02').setDailyInterval(2);

    t.notOk(r.matches('2012-01-01'), 'does not match day before start');
    t.ok(r.matches('2012-01-02'), 'matches start day');
    t.notOk(r.matches('2012-01-03'), 'does not match the next day');
    t.ok(r.matches('2012-01-04'), 'matches 2 days after start');
    t.notOk(r.matches('2012-01-05'), 'does not match the next day');
    t.ok(r.matches('2012-01-06'), 'matches 4 days after start');
    t.notOk(r.matches('2012-01-07'), 'does not match the next day');
    t.ok(r.matches('2012-01-08'), 'matches 4 days after start');

    t.end();
});

test("interval of 7 days (1 week)", function(t) {
    var r = recur('2012-01-02').setDailyInterval(7);

    t.notOk(r.matches('2011-12-26'), 'does not match week before start');
    t.notOk(r.matches('2012-01-01'), 'does not match day before start');
    t.ok(r.matches('2012-01-02'), 'matches start day');
    t.notOk(r.matches('2012-01-03'), 'does not match the next day');
    t.notOk(r.matches('2012-01-08'), 'does not match 6 days after start');
    t.ok(r.matches('2012-01-09'), 'matches 1 week after start');

    t.end();
});

test("interval of 3 days (for 1 week only)", function(t) {
    var r = recur('2012-01-02', '2012-01-09').setDailyInterval(3);

    t.notOk(r.matches('2011-12-30'), 'does not match 3 days before start');
    t.notOk(r.matches('2012-01-01'), 'does not match day before start');
    t.ok(r.matches('2012-01-02'), 'matches start day');
    t.notOk(r.matches('2012-01-03'), 'does not match the next day');
    t.ok(r.matches('2012-01-05'), 'matches first interval day');
    t.ok(r.matches('2012-01-08'), 'matches 2nd interval day');
    t.notOk(r.matches('2012-01-09'), 'does not match end date since it is not an interval');
    t.notOk(r.matches('2012-01-09'), 'does not match (a multiple of 3) after the end date');

    t.end();
});

// --------------------------------------------------------------------------------------------------------------------
