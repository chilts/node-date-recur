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
        .setMonthOfYear(2)
        .setDayOfMonth(14);

    // In the 3rd quarter of this year, I will breakdance every day
    var breakdancing = recur()
        .setMonthOfYear([7, 8, 9]);

    // NZ FOSS meets at lunch on the first Tuesday of every month
    var lunch = recur()
        .setDayOfWeek(2)
        .setDayOfMonth([1, 2, 3, 4, 5, 6, 7]);

    // My birthday is every leap year since 1976
    var lunch = recur('1976-02-29')
        .setYearlyInterval(2)
        .setDayOfMonth(29)
        .setMonthOfYear(2);

    // Friday the 13th can be qutie scary, so ping me when it occurs
    var fri13th = recur()
        .setDayOfMonth(13)
        .setDayOfWeek(5);

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
        .setMonthOfYear(11)
        .setDayOfWeek(2)
        .setDayOfMonth([2, 3, 4, 5, 6, 7, 8]);

```

# Author

Written by [Andrew Chilton](http://www.chilts.org/blog/)

Copyright 2011 [AppsAttic](http://www.appsattic.com/)

# License

MIT. See LICENSE for more details.

(Ends)
