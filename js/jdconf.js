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
  timeZoneName = now.zoneName;

  //timeZoneName = convertTimezoneToAbbreviation (now.zoneName);

  // Create the HTML string with the desired format
  const timeZoneInfoHTML = `Local time (${utcDiffString}) ${timeZoneName}`;

  return timeZoneInfoHTML;
}

function convertTimezoneToAbbreviation(timezone) {
  const timezoneMap = {
    "America/Chicago": "CT",
    "America/New_York": "ET",
    "America/Los_Angeles": "PT",
    "America/Denver": "MT",
    "America/Anchorage": "AKT",
    "Pacific/Honolulu": "HAT",
    "Europe/London": "GMT",
    "Europe/Berlin": "CET",
    "Europe/Lisbon": "WET",
    "Europe/Bucharest": "EET",
    // Add other mappings as needed
  };

  return timezoneMap[timezone] || timezone;
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
    localDateTimeString1 = localDate.toFormat('MMM dd');
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
    localStartDate = pstDate.toLocal();
    localDateTimeString1 = localDate.toLocaleString(luxon.DateTime.TIME_SIMPLE);

    // Convert to a Date object using PST timezone
    var pstDate = luxon.DateTime.fromFormat(date + ' ' + etime, 'dd-MMM-yy hh:mm a', { zone: 'America/Los_Angeles' });
    localDate = pstDate.toLocal();
    localDateTimeString2 = localDate.toLocaleString(luxon.DateTime.TIME_SIMPLE);

    timeZone = localDate.offsetNameShort;
    localDateTimeString3 = localStartDate.toFormat('MMM dd');

    // Update the text with the user's local time
    times[i].innerText = localDateTimeString3 + ", " + localDateTimeString1;
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

document.addEventListener('DOMContentLoaded', function () {
  // Your code here
  const timeZoneInfoHTML = getTimeZoneInfo();
  const timeZoneInfoDiv = document.getElementById('timeZoneInfoDiv2');
  timeZoneInfoDiv.innerHTML = timeZoneInfoHTML;
});

document.addEventListener('DOMContentLoaded', function () {
  // Your code here
  const timeZoneInfoHTML = getTimeZoneInfo();
  const timeZoneInfoDiv = document.getElementById('timeZoneInfoDiv3');
  timeZoneInfoDiv.innerHTML = timeZoneInfoHTML;
});

function toggleMenu() {
  var menuItems = document.getElementById("menuItems");
  menuItems.classList.toggle("active");
}


document.querySelectorAll('.nav-menu li a').forEach(item => {
  item.addEventListener('touchstart', function () {
    document.querySelector('.nav-menu li a.active').classList.remove('active');
    this.classList.add('active');
  });
});

window.addEventListener('load', main);

function main() {
	const navbarMenuButton = document.getElementById('navbar-menu-btn');
	const navbarNav = document.querySelector('.navbar > nav');

	let isOpen = false;

	navbarMenuButton.addEventListener('click', () => {
		if (isOpen) {
			navbarNav.style.display = 'none';
			isOpen = false;
		} else {
			navbarNav.style.display = 'flex'; 
			isOpen = true;
		}
	});
}

document.addEventListener('DOMContentLoaded', (event) => {
  const navbarNav = document.querySelector('.navbar > nav');
  navbarNav.style.display = 'flex'; 
  isOpen = true;
  if (window.innerWidth <= 768) {
      navbarNav.style.display = 'none';
      isOpen = false;
  }
});

window.addEventListener('resize', function() {
  const navbarNav = document.querySelector('.navbar > nav');
  if (window.innerWidth <= 768) {
      navbarNav.style.display = 'none';
      isOpen = false;
  } else {
      navbarNav.style.display = 'flex';
      isOpen = true;
  }
});

function startCountdownAmericas() {
    // Set the date we're counting down to (Pacific Daylight Time, UTC-7)
    var countDownDate = new Date("March 27, 2024 08:30:00 GMT-0700").getTime();

    // Update the count down every 1 second
    var x = setInterval(function() {

        // Get today's date and time (in user's local time)
        var now = new Date().getTime();
            
        // Find the time left between now and the count down date
        var distance = countDownDate - now;
            
        // Time calculations for days, hours, minutes, and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
        // Display the result in an element with id="demo"
        document.getElementById("americas-countdown").innerHTML = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";
        document.getElementById("americas-countdown").innerHTML = "Americas event will start in: " + days + " days, " + hours + " hours, " + minutes + " minutes, " + seconds + " seconds";
            
        // If the count down is finished, write some text 
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("americas-countdown").innerHTML = "EVENT STARTED";
        }
    }, 1000);
}

// Call the function to start the countdown
startCountdownAmericas();

function startCountdownAsia() {
  // Set the date we're counting down to (Pacific Daylight Time, UTC-7)
  var countDownDate = new Date("March 27, 2024 15:00:00 GMT-0700").getTime();

  // Update the count down every 1 second
  var x = setInterval(function() {

    // Get today's date and time (in user's local time)
    var now = new Date().getTime();

    // Find the time left between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes, and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in an element with id="demo"
    document.getElementById("asia-countdown").innerHTML = days + "d " + hours + "h " +
      minutes + "m " + seconds + "s ";
    document.getElementById("asia-countdown").innerHTML = "Asia-Pacific event will start in: " + days + " days, " + hours + " hours, " + minutes + " minutes, " + seconds + " seconds";

    // If the count down is finished, write some text 
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("asia-countdown").innerHTML = "EVENT STARTED";
    }
  }, 1000);
}

// Call the function to start the countdown
startCountdownAsia();

function startCountdownEurope() {
  // Set the date we're counting down to (Pacific Daylight Time, UTC-7)
  var countDownDate = new Date("March 28, 2024 04:00:00 GMT-0700").getTime();

  // Update the count down every 1 second
  var x = setInterval(function() {

    // Get today's date and time (in user's local time)
    var now = new Date().getTime();

    // Find the time left between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes, and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in an element with id="demo"
    document.getElementById("europe-countdown").innerHTML = days + "d " + hours + "h " +
      minutes + "m " + seconds + "s ";
    document.getElementById("europe-countdown").innerHTML = "EMEA event will start in: " + days + " days, " + hours + " hours, " + minutes + " minutes, " + seconds + " seconds";

    // If the count down is finished, write some text 
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("europe-countdown").innerHTML = "EVENT STARTED";
    }
  }, 1000);
}

// Call the function to start the countdown
startCountdownEurope();

// Write function for cookie consent
function handleCookieConsent() {
  // Check if user has previously provided consent
  const hasConsented = getCookie("cookieConsent") || false;

  // If user has not provided consent, display cookie consent banner
  if (!hasConsented) {
    // Display banner code here...
  }

  // Handle user's consent decision
  const acceptButton = document.getElementById("acceptCookiesButton");
  const declineButton = document.getElementById("declineCookiesButton");

  acceptButton.addEventListener("click", () => {
    // Set cookie or update consent status variable
    setCookie("cookieConsent", true);
    // Hide cookie consent banner
    hideBanner();
    // Enable or load features that require cookies
    enableFeatures();
  });

  declineButton.addEventListener("click", () => {
    // Handle decline logic (e.g., disable certain features)
    disableFeatures();
  });

  // Add update consent option for previously consented users
  const updateButton = document.getElementById("updateConsentButton");

  updateButton.addEventListener("click", () => {
    // Show cookie consent banner and allow user to update their consent options
    showBanner();
  });
}

// Helper function to get the value of a specific cookie
function getCookie(cookieName) {
  const cookieValue = document.cookie.match(`(^|;)\\s*${cookieName}\\s*=\\s*([^;]+)`);
  return cookieValue ? cookieValue.pop() : null;
}

// Helper function to set a cookie with a specific value
function setCookie(cookieName, cookieValue) {
  document.cookie = `${cookieName}=${cookieValue}`;
}
