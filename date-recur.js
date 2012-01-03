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
// requires

var _ = require('underscore');

// --------------------------------------------------------------------------------------------------------------------
// constants

var millisecondsInOneDay = 24 * 60 * 60 * 1000;

// --------------------------------------------------------------------------------------------------------------------

// utility functions
function toDate(d) {
    if ( _.isDate(d) ) {
        return d;
    }

    // check if the date string looks ok
    if ( typeof d === 'string' && d.match(/^(\d\d\d\d-\d\d-\d\d)$/) ) {
        return new Date(d);
    }

    // shouldn't ever get here, so throw an error
    throw 'Unknown date format : ' + d;
}

function diffInDays(d1, d2) {
    return (d2 - d1) / millisecondsInOneDay;
}

function diffInMonths(d1, d2) {
    return (d2.getUTCFullYear() - d1.getUTCFullYear()) * 12 + (d2.getMonth() - d1.getMonth());
}

// --------------------------------------------------------------------------------------------------------------------

// DateRecur object
var DateRecur = function(options) {
    if ( options.start ) {
        this.start = toDate(options.start);
    }

    if ( options.end ) {
        this.end = toDate(options.end);
    }

    // this is our list of rules, every one of which should match
    this.rules = [];

    return this;
}

DateRecur.prototype.start = function(date) {
    this.start = toDate(date);
    return this;
}

DateRecur.prototype.end = function(date) {
    this.end = toDate(date);
    return this;
}

DateRecur.prototype.setDailyInterval = function(interval) {
    var self = this;
    interval = parseInt(interval);

    if ( !self.start ) {
        throw Error('You can only add an interval if this recurrence has a start date');
    }

    if ( interval <= 0 ) {
        throw Error('Interval must be greater than zero');
    }

    // add this daily interval to the list of rules to match
    self.rules.push({
        type     : 'dailyInterval',
        interval : interval,
    });

    return self;
}

DateRecur.prototype.setMonthlyInterval = function(interval) {
    var self = this;
    interval = parseInt(interval);

    if ( !self.start ) {
        throw Error('You can only add an interval if this recurrence has a start date');
    }

    if ( interval <= 0 ) {
        throw Error('Interval must be greater than zero');
    }

    // add this daily interval to the list of rules to match
    self.rules.push({
        type     : 'monthlyInterval',
        interval : interval,
    });

    return self;
}

// --------------------------------------------------------------------------------------------------------------------
// ... and the magic 'matches' function

DateRecur.prototype.matches = function(date) {
    var self = this;

    // convert to a proper date first
    date = toDate(date);

    // do start and end dates
    if ( self.start && date < self.start ) {
        return false;
    }

    if ( self.end && date > self.end ) {
        return false;
    }

    // now loop through all the rules
    var i, rule, diffDays, diffMonths;
    for ( i = 0; i < self.rules.length; i++ ) {
        rule = self.rules[i];

        switch ( rule.type ) {
        case 'dailyInterval':
            diffDays = diffInDays(self.start, date);
            if ( (diffDays % rule.interval) !== 0 ) {
                return false;
            }
            break;
        case 'monthlyInterval':
            diffMonths = diffInMonths(self.start, date);
            console.log('diffMonths=' + diffMonths);
            if ( (diffMonths % rule.interval) !== 0 ) {
                return false;
            }
            break;
        }

    }

    // if we passed everything above, then this date matches
    return true;
}

// --------------------------------------------------------------------------------------------------------------------
// export a utility function

module.exports = function(start, end) {
    if ( _.isObject(start) ) {
        // ie. it's a set of options
        return new DateRecur( start );
    }

    return new DateRecur({ start : start, end : end });
};

// --------------------------------------------------------------------------------------------------------------------
