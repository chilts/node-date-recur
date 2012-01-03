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
require('date-utils'); // polyfills the Date object with extra things

// --------------------------------------------------------------------------------------------------------------------
// constants

var millisecondsInOneDay = 24 * 60 * 60 * 1000;

// --------------------------------------------------------------------------------------------------------------------

// utility functions
function toDate(d) {
    if ( _.isDate(d) ) {
        // just get the date (no time)
        return new Date(d.toISOString().substr(0, 10));
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

function checkRange(low, high, list) {
    list.forEach(function(v) {
        if ( v < low || v > high ) {
            throw Error('Value should be in range ' + low + ' to ' + high);
        }
    });
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

    // default this to Monday
    this.startOfWeek = 1

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

DateRecur.prototype.diffInWeeks = function(d1, d2) {
    // get the start of the week for both dates
    d1 = this.getStartOfWeek(d1);
    d2 = this.getStartOfWeek(d2);

    return diffInDays(d1, d2) / 7;
}

DateRecur.prototype.getStartOfWeek = function(date) {
    while ( date.getDay() !== this.startOfWeek ) {
        date.addDays(-1);
    }
    return date;
}

DateRecur.prototype.setStartOfWeek = function(dayNumber) {
    checkRange(0, 6, [ dayNumber ]);
    this.startOfWeek = dayNumber;
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

    self.rules.push({
        type     : 'dailyInterval',
        interval : interval,
    });

    return self;
}

DateRecur.prototype.setWeeklyInterval = function(interval) {
    var self = this;
    interval = parseInt(interval);

    if ( !self.start ) {
        throw Error('You can only add an interval if this recurrence has a start date');
    }

    if ( interval <= 0 ) {
        throw Error('Interval must be greater than zero');
    }

    self.rules.push({
        type     : 'weeklyInterval',
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

    self.rules.push({
        type     : 'monthlyInterval',
        interval : interval,
    });

    return self;
}

DateRecur.prototype.setYearlyInterval = function(interval) {
    var self = this;
    interval = parseInt(interval);

    if ( !self.start ) {
        throw Error('You can only add an interval if this recurrence has a start date');
    }

    if ( interval <= 0 ) {
        throw Error('Interval must be greater than zero');
    }

    self.rules.push({
        type     : 'yearlyInterval',
        interval : interval,
    });

    return self;
}

DateRecur.prototype.setDaysOfMonth = function(days) {
    var self = this;
    var ourDays = {};

    // days can be an array or object
    if ( _.isArray(days) ) {
        days.forEach(function(v) {
            ourDays[v] = true;
        });
    }
    else if ( _.isObject(days) ) {
        ourDays = days;
    }
    else if ( _.isNumber(days) ) {
        ourDays = {};
        ourDays[days] = true;
    }
    else {
        throw Error("Provide an array or object to setDaysOfMonth()");
    }

    checkRange(1, 31, _.keys(ourDays));

    self.rules.push({
        type : 'daysOfMonth',
        days : ourDays,
    });

    return self;
}

DateRecur.prototype.setDaysOfWeek = function(days) {
    var self = this;
    var ourDays = {};

    // days can be an array or object
    if ( _.isArray(days) ) {
        days.forEach(function(v) {
            ourDays[v] = true;
        });
    }
    else if ( _.isObject(days) ) {
        ourDays = days;
    }
    else if ( _.isNumber(days) ) {
        ourDays = {};
        ourDays[days] = true;
    }
    else {
        throw Error("Provide an array or object to setDaysOfWeek()");
    }

    checkRange(0, 6, _.keys(ourDays));

    self.rules.push({
        type : 'daysOfWeek',
        days : ourDays,
    });

    return self;
}

DateRecur.prototype.setMonthsOfYear = function(months) {
    var self = this;
    var ourMonths = {};

    // months can be an array or object
    if ( _.isArray(months) ) {
        months.forEach(function(v) {
            ourMonths[v] = true;
        });
    }
    else if ( _.isObject(months) ) {
        ourMonths = months;
    }
    else if ( _.isNumber(days) ) {
        ourDays = {};
        ourDays[days] = true;
    }
    else {
        throw Error("Provide an array or object to setMonthsOfYear()");
    }

    checkRange(1, 12, _.keys(ourMonths));

    self.rules.push({
        type : 'monthsOfYear',
        months : ourMonths,
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
    var i, rule, diffDays, diffWeeks, diffMonths, diffYears;
    for ( i = 0; i < self.rules.length; i++ ) {
        rule = self.rules[i];

        switch ( rule.type ) {
        case 'dailyInterval':
            diffDays = diffInDays(self.start, date);
            if ( (diffDays % rule.interval) !== 0 ) {
                return false;
            }
            break;
        case 'weeklyInterval':
            diffWeeks = self.diffInWeeks(self.start, date);
            if ( (diffWeeks % rule.interval) !== 0 ) {
                return false;
            }
            break;
        case 'monthlyInterval':
            diffMonths = diffInMonths(self.start, date);
            if ( (diffMonths % rule.interval) !== 0 ) {
                return false;
            }
            break;
        case 'yearlyInterval':
            diffYears = date.getUTCFullYear() - self.start.getUTCFullYear();
            if ( (diffYears % rule.interval) !== 0 ) {
                return false;
            }
            break;
        case 'daysOfMonth':
            // if this day of month is not in rule.days, return false
            if ( !rule.days[date.getDate()] ) {
                return false;
            }
            break;
        case 'daysOfWeek':
            // if this day of week is not in rule.days, return false
            if ( !rule.days[date.getDay()] ) {
                return false;
            }
            break;
        case 'monthsOfYear':
            // if this month is not in rule.months, return false
            if ( !rule.months[date.getMonth()+1] ) {
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
