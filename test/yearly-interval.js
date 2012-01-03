// --------------------------------------------------------------------------------------------------------------------
//
// yearly-interval.js - tests for yearly intervals
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

test("interval of 2 years", function(t) {
    var r = recur('2012-01-02').setYearlyInterval(2);

    t.notOk(r.matches('2012-01-01'), 'does not match day before start');
    t.ok(r.matches('2012-01-02'), 'matches start day');
    t.notOk(r.matches('2013-01-02'), 'does not match this day next year');
    t.ok(r.matches('2014-01-02'), 'matches this day the following year');

    t.end();
});

// --------------------------------------------------------------------------------------------------------------------
