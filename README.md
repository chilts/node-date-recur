```
                       ______   _______ _________ _______      _______  _______  _______           _______ 
                      (  __  \ (  ___  )\__   __/(  ____ \    (  ____ )(  ____ \(  ____ \|\     /|(  ____ )
                      | (  \  )| (   ) |   ) (   | (    \/    | (    )|| (    \/| (    \/| )   ( || (    )|
                      | |   ) || (___) |   | |   | (__  _____ | (____)|| (__    | |      | |   | || (____)|
                      | |   | ||  ___  |   | |   |  __)(_____)|     __)|  __)   | |      | |   | ||     __)
                      | |   ) || (   ) |   | |   | (          | (\ (   | (      | |      | |   | || (\ (   
                      | (__/  )| )   ( |   | |   | (____/\    | ) \ \__| (____/\| (____/\| (___) || ) \ \__
                      (______/ |/     \|   )_(   (_______/    |/   \__/(_______/(_______/(_______)|/   \__/
                                                                                                           
```

Create a recurring date and query it to see if it lands on a particular date.

Build Status : [![Build Status](https://secure.travis-ci.org/appsattic/node-date-recur.png)](http://travis-ci.org/appsattic/node-date-recur)

# How to get date-recur #

    $ npm -d install date-recur

# Examples #

Since this is a small (but very useful) library, I'll show you a number of examples on what you can do with it.

```
var recur = require('date-recur');

// I take little Jimmy to football every Saturday
var lunch = recur()
    .setDayOfWeek(6);

// .. but he only goes to trampolining every other Thursday
var lunch = recur('2012-01-02')
    .setDayOfWeek(4)
    .setWeeklyInterval(2);

// Christmas always falls on the same day every year
var christmas = recur()
    .setMonthOfYear(12)
    .setDayOfMonth(25);

// .. as does Valentine's Day
var valentines = recur()
    .setMonthOfYear('February')
    .setDayOfMonth(14);

// In the 3rd quarter of this year, I will breakdance every day
var breakdancing = recur()
    .setMonthOfYear([7, 8, 9]);

// NZ FOSS meets at lunch on the first Tuesday of every month
var lunch = recur()
    .setDayOfWeek('Tue')
    .setDayOfMonth([1, 2, 3, 4, 5, 6, 7]);

// My birthday is every leap year since 1976
var lunch = recur('1976-02-29')
    .setYearlyInterval(4)
    .setDayOfMonth(29)
    .setMonthOfYear('Feb');

// Friday the 13th can be qutie scary, so ping me when it occurs
var fri13th = recur()
    .setDayOfMonth(13)
    .setDayOfWeek('fri');

// There is a bi-monthly dance at the local club (on the 3rd Saturday)
var lunch = recur('2012-01-01')
    .setMonthlyInterval(2)
    .setDayOfMonth([16, 17, 18, 19, 20, 21, 22]);

// Wellington PerlMongers meets on the first Tuesday of every month (except if it's the 1st) from Feb to Dec
var meeting = recur()
    .setMonthOfYear([ 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]) // Feb to Dec
    .setDayOfWeek(2) // Tuesday
    .setDayOfMonth([2, 3, 4, 5, 6, 7, 8]); // make sure it's never on the 1st

// US Elections are every 4 years, on a Tuesday in November (not the 1st)
var election = recur('2012-01-01')
    .setYearlyInterval(4)
    .setMonthOfYear('November')
    .setDayOfWeek('Tuesday')
    .setDayOfMonth([2, 3, 4, 5, 6, 7, 8]);
```

## .matches(date) ##

Returns true or false depending on whether your recurring date lands on the date passed in.

```
var fri13th = recur().setDayOfMonth(13).setDayOfWeek(5);
fri13th.matches('2012-01-13;);           // jan 2011 is true
fri13th.matches(new Date('2012-01-13')); // jan 2011 is true
fri13th.matches('2012-02-13;);           // feb 2012 is false
fri13th.matches(new Date('2012-02-13')); // feb 2012 is false
```

## .start(date) ##

As well as passing a start date to the constructor, you can use this method too. A start date is useful to limit where
your recurrences happen, but also for setting an interval since intervals require a start date.

```
// all of these three are equivalent
var r1 = recur().start('2011-02-01');
var r2 = recur('2011-02-01');
var r3 = recur({ start : '2011-02-01' });
```

## .end(date) ##

As well as passing an end date to the constructor, you can use this method too.

```
// all of these three are equivalent
var r1 = recur().end('2011-12-15');
var r2 = recur(null, '2011-12-15');
var r3 = recur({ end : '2011-12-15' });
```

## .setStartOfWeek(day) ##

The start of the week defaults to Monday (value 1). You may want to set it to Sunday (0).

```
// all of these three are equivalent
var r1 = recur().setStartOfWeek(1);
var r2 = recur().setStartOfWeek('Monday');
var r3 = recur().setStartOfWeek('Mon');
var r4 = recur().setStartOfWeek('monday');
var r5 = recur().setStartOfWeek('mon');
```

## .setDaysOfWeek(daysOfWeek) ##

Sets which days of each week the event occurs on. 'daysOfWeek' can be a number, array or object (where the keys are the
day names or numbers). You can use day numbers (0-6) or day names ('Monday', 'monday', 'Mon', 'mon') as the values. You
do not need a start date for this restriction.

```
// every Saturday (all of these are the same)
var sat1 = recur().setDaysOfWeek(6);
var sat2 = recur().setDaysOfWeek('Saturday');
var sat3 = recur().setDaysOfWeek('saturday');
var sat4 = recur().setDaysOfWeek('Sat');
var sat5 = recur().setDaysOfWeek('sat');

// every Monday, Wednesday and Friday
var mwf1 = recur().setDaysOfWeek([1, 3, 5]);
var mwf2 = recur().setDaysOfWeek({ mon : 1, wed : 1, fri : 1 });

// both days at the weekend
var weekend1 = recur().setDaysOfWeek([ 'Saturday', 'Sunday' ]);
var weekend2 = recur().setDaysOfWeek({ Sat : true, Sun : true });
```

## .setDaysOfMonth(daysOfMonth) ##

Sets which days of each month the event occurs on. 'daysOfMonth' can be a number, array or object (where the keys are
the day numbers). You do not need a start date for this restriction.

```
// the 12th of every month
var monthlyDance = recur().setDaysOfMonth(12);

// the first 7 days of the month
var r2 = recur().setDaysOfMonth([1, 2, 3, 4, 5, 6, 7]);

// the 7th and 14th of every month
var r2 = recur().setDaysOfMonth({ 7 : true, 14 : true });
```

## .setWeeksOfMonth(weeksOfMonth) ##

Sets which weeks of the month the event occurson. 'weeksOfMonth' can be a number, array or object (where the keys are
the week numbers). The weeks must be between 0 and 5 inclusive. This method is affected by the 'startOfWeek'
setting. You do not need a start date for this restriction.

```
// occurs every day in the 3rd week of each month
var week3 = recur().setWeeksOfMonth(2);
```

NOTE1: this may not do what you want it to. For example, for the first Monday of every month, the following will not
work (line 1). You must do it as line 2.

```
// first Monday of every month
var firstMonday1 = recur().setDaysOfWeek('Monday').setWeeksOfMonth(0).;             // WRONG!
var firstMonday2 = recur().setDaysOfWeek('Monday').setDaysOfMonth([1,2,3,4,5,6,7]); // RIGHT
```

NOTE2: Week 0 and week 4 may be short weeks. For example, week 0 of Feb 2012 starts on Wednesday so this only matches
on the 1st to the 5th.

## .setWeeksOfYear(weeksOfYear) ##

Sets which weeks of the year the event occurson. 'weeksOfYear' can be a number, array or object (where the keys are the
week numbers). The weeks must be between 0 and 52 inclusive. This method is affected by the 'startOfWeek' setting. You
do not need a start date for this restriction.

```
// occurs every day in the 1st week (week 0) of each year
var week0 = recur().setWeeksOfYear(0);

// occurs every day in the 3rd week (week 2) of each year
var week2 = recur().setWeeksOfYear(2);

// occurs every day in the 3rd (week 2) and 5th (week 4) weeks of every year
var weeks3and5 = recur().setWeeksOfYear([2, 4]);
```

NOTE1: this may not do what you want it to. For example, for the first Monday of the year, the following will not
work (line 1). You must do it as line 2.

```
// first Monday of every year
var firstMonday1 = recur().setDaysOfWeek('Monday').setWeeksOfYear(0);             // WRONG!
var firstMonday2 = recur().setDaysOfWeek('Monday').setDaysOfYear([1,2,3,4,5,6,7]); // RIGHT

// the 39th Monday of the year makes more sense
var mondayNumber39 = recur().setDaysOfWeek('Monday').setWeeksOfYear(38);
```

NOTE2: Week 0 and week 52 may be short weeks. For example, week 0 of 2013 starts on Tuesday so this only matches
on the 1st to the 6th.

## .setMonthsOfYear(monthsOfYear) ##

Sets which months of each year the event occurs on. 'monthsOfYear' can be a number, array or object (where the keys are
the month names or numbers). You can use month numbers (1-12) or month names ('January', 'january', 'Jan', 'jan') as
the values. You do not need a start date for this restriction.

```
// every March
var mar1 = recur().setMonthsOfYear(3);
var mar2 = recur().setMonthsOfYear('March');
var mar3 = recur().setMonthsOfYear('march');
var mar4 = recur().setMonthsOfYear('Mar');
var mar5 = recur().setMonthsOfYear('mar');

// every October, November and December
var mwf1 = recur().setDaysOfWeek([10, 11, 12]);
var mwf2 = recur().setDaysOfWeek({ oct : 1, nov : 1, dec : 1, fri : 1 });

// every quarter in Mar, Jun, Sep, Dec
var qtr1 = recur().setDaysOfWeek([ 'March', 'June', 'September', 'December' ]);
var qtr2 = recur().setDaysOfWeek( 'mar,jun,sep,dec'.split(',') );
```

## .setDailyInterval(numOfDays) ##

Sets the number of days between each occurrence. You must have a start date when setting this interval.

```
var r1 = recur('2012-01-01').setDailyInterval(2); // you work-out every other day
var r2 = recur('2012-01-01').setDailyInterval(37); // you like prime numbers
```

## .setWeeklyInterval(numOfWeeks) ##

Sets the number of weeks between each occurrence. You must have a start date when setting this interval. This is also
affected by the 'startOfWeek' setting.

```
// every day for the 0th, 2nd, 4th (etc) weeks
var r1 = recur('2012-01-01').setWeeklyInterval(2);

// every 4th Monday
var r2 = recur('2012-01-01').setWeeklyInterval(4).setDaysOfWeek('Monday');
```

## .setMonthlyInterval(numOfMonths) ##

Sets the number of months between each occurrence. You must have a start date when setting this interval.

```
// every day in Jan, Mar, May, Jul, Sep, Nov
var r1 = recur('2012-01-01').setMonthlyInterval(2);

// the 2nd of the month at the start of every quarter
var r2 = recur('2012-01-01').setWeeklyInterval(3).setDayOfMonth(2);
```

## .setYearlyInterval(numOfYears) ##

Sets the number of years between each occurrence. You must have a start date when setting this interval.

```
// every other year
var myFestival = recur('2012-01-01').setYearlyInterval(2);

// every 4th year (Feb 29th)
var r2 = recur('2012-02-29').setYearlyInterval(4).setMonthOfYear(2).setDayOfMonth(29);
var r3 = recur('2012-01-01').setMonthOfYear(2).setDayOfMonth(29); // same thing
```

# Author

Written by [Andrew Chilton](http://www.chilts.org/blog/)

Copyright 2011 [AppsAttic](http://www.appsattic.com/)

# License

MIT. See LICENSE for more details.

(Ends)
