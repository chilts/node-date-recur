// --------------------------------------------------------------------------------------------------------------------
//
// constants.js - tests for date-recur's constants
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

test("month constants", function(t) {
    t.ok(recur.January   ===  1, 'January'  );
    t.ok(recur.February  ===  2, 'February' );
    t.ok(recur.March     ===  3, 'March'    );
    t.ok(recur.April     ===  4, 'April'    );
    t.ok(recur.May       ===  5, 'May'      );
    t.ok(recur.June      ===  6, 'June'     );
    t.ok(recur.July      ===  7, 'July'     );
    t.ok(recur.August    ===  8, 'August'   );
    t.ok(recur.September ===  9, 'September');
    t.ok(recur.October   === 10, 'October'  );
    t.ok(recur.November  === 11, 'November' );
    t.ok(recur.December  === 12, 'December' );

    t.ok(recur.Jan ===  1, 'Jan');
    t.ok(recur.Feb ===  2, 'Feb');
    t.ok(recur.Mar ===  3, 'Mar');
    t.ok(recur.Apr ===  4, 'Apr');
    t.ok(recur.May ===  5, 'May');
    t.ok(recur.Jun ===  6, 'Jun');
    t.ok(recur.Jul ===  7, 'Jul');
    t.ok(recur.Aug ===  8, 'Aug');
    t.ok(recur.Sep ===  9, 'Sep');
    t.ok(recur.Oct === 10, 'Oct');
    t.ok(recur.Nov === 11, 'Nov');
    t.ok(recur.Dec === 12, 'Dec');

    t.ok(recur.january   ===  1, 'january'  );
    t.ok(recur.february  ===  2, 'february' );
    t.ok(recur.march     ===  3, 'march'    );
    t.ok(recur.april     ===  4, 'april'    );
    t.ok(recur.may       ===  5, 'may'      );
    t.ok(recur.june      ===  6, 'june'     );
    t.ok(recur.july      ===  7, 'july'     );
    t.ok(recur.august    ===  8, 'august'   );
    t.ok(recur.september ===  9, 'september');
    t.ok(recur.october   === 10, 'october'  );
    t.ok(recur.november  === 11, 'november' );
    t.ok(recur.december  === 12, 'december' );

    t.ok(recur.jan ===  1, 'jan');
    t.ok(recur.feb ===  2, 'feb');
    t.ok(recur.mar ===  3, 'mar');
    t.ok(recur.apr ===  4, 'apr');
    t.ok(recur.may ===  5, 'may');
    t.ok(recur.jun ===  6, 'jun');
    t.ok(recur.jul ===  7, 'jul');
    t.ok(recur.aug ===  8, 'aug');
    t.ok(recur.sep ===  9, 'sep');
    t.ok(recur.oct === 10, 'oct');
    t.ok(recur.nov === 11, 'nov');
    t.ok(recur.dec === 12, 'dec');

    t.end();
});

test("day constants", function(t) {
    t.ok(recur.Sunday    === 0, 'Sunday'   );
    t.ok(recur.Monday    === 1, 'Monday'   );
    t.ok(recur.Tuesday   === 2, 'Tuesday'  );
    t.ok(recur.Wednesday === 3, 'Wednesday');
    t.ok(recur.Thursday  === 4, 'Thursday' );
    t.ok(recur.Friday    === 5, 'Friday'   );
    t.ok(recur.Saturday  === 6, 'Saturday' );

    t.ok(recur.Sun === 0, 'Sun');
    t.ok(recur.Mon === 1, 'Mon');
    t.ok(recur.Tue === 2, 'Tue');
    t.ok(recur.Wed === 3, 'Wed');
    t.ok(recur.Thu === 4, 'Thu');
    t.ok(recur.Fri === 5, 'Fri');
    t.ok(recur.Sat === 6, 'Sat');

    t.ok(recur.sunday    === 0, 'sunday'   );
    t.ok(recur.monday    === 1, 'monday'   );
    t.ok(recur.tuesday   === 2, 'tuesday'  );
    t.ok(recur.wednesday === 3, 'wednesday');
    t.ok(recur.thursday  === 4, 'thursday' );
    t.ok(recur.friday    === 5, 'friday'   );
    t.ok(recur.saturday  === 6, 'saturday' );

    t.ok(recur.sun === 0, 'sun');
    t.ok(recur.mon === 1, 'mon');
    t.ok(recur.tue === 2, 'tue');
    t.ok(recur.wed === 3, 'wed');
    t.ok(recur.thu === 4, 'thu');
    t.ok(recur.fri === 5, 'fri');
    t.ok(recur.sat === 6, 'sat');

    t.end();
});

// --------------------------------------------------------------------------------------------------------------------
