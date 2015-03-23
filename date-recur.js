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
var moment = require('moment');

// --------------------------------------------------------------------------------------------------------------------
// constants

var millisecondsInOneDay = 24 * 60 * 60 * 1000;

var DAYS = {
  Sun : 0, sun : 0, Sunday    : 0, sunday    : 0,
  Mon : 1, mon : 1, Monday    : 1, monday    : 1,
  Tue : 2, tue : 2, Tuesday   : 2, tuesday   : 2,
  Wed : 3, wed : 3, Wednesday : 3, wednesday : 3,
  Thu : 4, thu : 4, Thursday  : 4, thursday  : 4,
  Fri : 5, fri : 5, Friday    : 5, friday    : 5,
  Sat : 6, sat : 6, Saturday  : 6, saturday  : 6,
};

var MONTHS = {
  Jan :  1, jan :  1, January   :  1, january   :  1,
  Feb :  2, feb :  2, February  :  2, february  :  2,
  Mar :  3, mar :  3, March     :  3, march     :  3,
  Apr :  4, apr :  4, April     :  4, april     :  4,
  May :  5, may :  5, May       :  5, may       :  5,
  Jun :  6, jun :  6, June      :  6, june      :  6,
  Jul :  7, jul :  7, July      :  7, july      :  7,
  Aug :  8, aug :  8, August    :  8, august    :  8,
  Sep :  9, sep :  9, September :  9, september :  9,
  Oct : 10, oct : 10, October   : 10, october   : 10,
  Nov : 11, nov : 11, November  : 11, november  : 11,
  Dec : 12, dec : 12, December  : 12, december  : 12,
};

// --------------------------------------------------------------------------------------------------------------------

// utility functions
function toDate(d) {
  return moment(d).startOf('day').toDate();
}

function diffInDays(d1, d2) {
  return moment(d2).diff(d1, 'days', true);
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
  return moment(d2).diff(d1, 'weeks', true);
}

DateRecur.prototype.getStartOfMonth = function(date) {
  // since we'll be changing the date, make a copy of it
  var d = new Date(date);
  while ( d.getDate() !== 1 ) {
    d.addDays(-1);
  }
  return d;
}

DateRecur.prototype.getStartOfWeek = function(date) {
  // since we'll be changing the date, make a copy of it
  var d = new Date(date);
  while ( d.getDay() !== this.startOfWeek ) {
    d.addDays(-1);
  }
  return d;
}

DateRecur.prototype.getStartOfYear = function(date) {
  return new Date('' + date.getFullYear() + '-01-01');
}

DateRecur.prototype.setStartOfWeek = function(day) {
  if ( _.isString(day) ) {
    day = DAYS[day];
  }
  checkRange(0, 6, [ day ]);
  this.startOfWeek = day;
  return this;
}

DateRecur.prototype.weekOfMonth = function(date) {
  var weekOfMonth = Math.ceil(moment(date).date() / 7);
  // our weeks are from week 0 to week 4
  if(weekOfMonth > 4){
    weekOfMonth = 4;
  }
  return weekOfMonth;
}

DateRecur.prototype.weekOfYear = function(date) {
  var first = this.getStartOfYear(date);
  var week0 = this.getStartOfWeek(first);

  // our weeks are from week 0 to week 52
  return this.diffInWeeks(week0, date);
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

function convertDayNamesToNumbers(ourDays) {
  _.each(ourDays, function(v, k) {
    if ( typeof v === 'string' ) {
      ourDays[k] = DAYS[v];
    }
  });
  return ourDays;
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

  ourDays = convertDayNamesToNumbers(ourDays);
  checkRange(0, 6, _.keys(ourDays));

  self.rules.push({
    type : 'daysOfWeek',
    days : ourDays,
  });

  return self;
}

DateRecur.prototype.setWeeksOfMonth = function(weeks) {
  var self = this;
  var ourWeeks = {};

  // weeks can be an array or object
  if ( _.isArray(weeks) ) {
    weeks.forEach(function(v) {
      ourWeeks[v] = true;
    });
  }
  else if ( _.isObject(weeks) ) {
    ourWeeks = weeks;
  }
  else if ( _.isNumber(weeks) ) {
    ourWeeks = {};
    ourWeeks[weeks] = true;
  }
  else {
    throw Error("Provide an array or object to setWeeksOfMonth()");
  }

  checkRange(0, 4, _.keys(ourWeeks));

  self.rules.push({
    type  : 'weeksOfMonth',
    weeks : ourWeeks,
  });

  return self;
}

DateRecur.prototype.setWeeksOfYear = function(weeks) {
  var self = this;
  var ourWeeks = {};

  // weeks can be an array or object
  if ( _.isArray(weeks) ) {
    weeks.forEach(function(v) {
      ourWeeks[v] = true;
    });
  }
  else if ( _.isObject(weeks) ) {
    ourWeeks = weeks;
  }
  else if ( _.isNumber(weeks) ) {
    ourWeeks = {};
    ourWeeks[weeks] = true;
  }
  else {
    throw Error("Provide an array or object to setWeeksOfMonth()");
  }

  checkRange(0, 52, _.keys(ourWeeks));

  self.rules.push({
    type  : 'weeksOfYear',
    weeks : ourWeeks,
  });

  return self;
}

function convertMonthNamesToNumbers(ourMonths) {
  _.each(ourMonths, function(v, k) {
    if ( typeof v === 'string' ) {
      ourMonths[k] = MONTHS[v];
    }
  });
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
      case 'weeksOfMonth':
        // if this weeks of month is not in rule.weeks, return false
        weekOfMonth = self.weekOfMonth(date);
        if ( !rule.weeks[weekOfMonth] ) {
          return false;
        }
        break;
      case 'weeksOfYear':
        // if this week of year is not in rule.weeks, return false
        weekOfYear = self.weekOfYear(date);
        if ( !rule.weeks[weekOfYear] ) {
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

// add all of the days
_.each(DAYS, function(v, k) {
  module.exports[k] = v;
});

// add all of the months
_.each(MONTHS, function(v, k) {
  module.exports[k] = v;
});

// --------------------------------------------------------------------------------------------------------------------
