function getTimeZoneInfo() {
  // Get the current date and time
  const now = luxon.DateTime.now();

  // Get the current time zone offset in minutes
  const timeZoneOffsetMinutes = now.offset;

  // Calculate the UTC time difference in hours and minutes
  const hoursDiff = Math.floor(timeZoneOffsetMinutes / 60);
  const minutesDiff = timeZoneOffsetMinutes % 60;

  // Create a string for the UTC time difference
  const utcDiffString = `UTC${hoursDiff >= 0 ? '+' : '-'}${Math.abs(hoursDiff).toString().padStart(2, '0')}:${Math.abs(minutesDiff).toString().padStart(2, '0')}`;

  // Get the IANA time zone name (e.g., "America/Chicago")
  const timeZoneName = now.zoneName;

  // Create the HTML string with the desired format
  const timeZoneInfoHTML = `All times in - (${utcDiffString}) ${timeZoneName}`;

  return timeZoneInfoHTML;
}

function convertToUserDate() {
    // Get all elements with class 'session-time'
    var sessiondate = document.getElementsByClassName('session-date');

    for (var i = 0; i < sessiondate.length; i++) {
        // Assume the time is in "HH:MM AM/PM" format and the date is in "DD-MMM-YY" format
        var dateTime = sessiondate[i].innerText.split(' ');
        var date = dateTime[0];
        var stime = dateTime[1] + ' ' + dateTime[3];

        // Convert to a Date object using PST timezone
        var pstDate = luxon.DateTime.fromFormat(date + ' ' + stime, 'dd-MMM-yy hh:mm a', { zone: 'America/Los_Angeles' });
        localDate = pstDate.toLocal();
        localDateTimeString1 = localDate.toFormat ('MMM dd');
        //localDateTimeString1 = localDate.toLocaleString(luxon.DateTime.DATE_SIMPLE);
        
                   
        // Update the text with the user's local time
        sessiondate[i].innerText = localDateTimeString1;
    }
    }

    function convertToUserTimeZone() {
    // Get all elements with class 'session-time'
    var times = document.getElementsByClassName('session-time');

    for (var i = 0; i < times.length; i++) {
        // Assume the time is in "HH:MM AM/PM" format and the date is in "DD-MMM-YY" format
        var dateTime = times[i].innerText.split(' ');
        var date = dateTime[0];
        var stime = dateTime[1] + ' ' + dateTime[3];
        var etime = dateTime[2] + ' ' + dateTime[3];

        // Convert to a Date object using PST timezone
        var pstDate = luxon.DateTime.fromFormat(date + ' ' + stime, 'dd-MMM-yy hh:mm a', { zone: 'America/Los_Angeles' });
        localDate = pstDate.toLocal();
        localDateTimeString1 = localDate.toLocaleString(luxon.DateTime.TIME_SIMPLE);

        // Convert to a Date object using PST timezone
        var pstDate = luxon.DateTime.fromFormat(date + ' ' + etime, 'dd-MMM-yy hh:mm a', { zone: 'America/Los_Angeles' });
        localDate = pstDate.toLocal();
        localDateTimeString2 = localDate.toLocaleString(luxon.DateTime.TIME_SIMPLE);

        timeZone = localDate.offsetNameShort;
        
        // Update the text with the user's local time
        times[i].innerText = localDateTimeString1;
    }
    }
    // Call the functions when the page loads
    window.onload = function () {
        convertToUserTimeZone(); // Call the first function
        convertToUserDate(); // Call the second function
    };



document.addEventListener('DOMContentLoaded', function () {
  // Your code here
  const timeZoneInfoHTML = getTimeZoneInfo();
  const timeZoneInfoDiv = document.getElementById('timeZoneInfoDiv');
  timeZoneInfoDiv.innerHTML = timeZoneInfoHTML;
});


function toggleMenu() {
  var menuItems = document.getElementById("menuItems");
  menuItems.classList.toggle("active");
}


document.querySelectorAll('.nav-menu li a').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelector('.nav-menu li a.active').classList.remove('active');
        this.classList.add('active');
    });
});


