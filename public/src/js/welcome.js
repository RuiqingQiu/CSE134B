$( document ).ready(function() {
  Parse.initialize("ULppY5RxxZUo8yekihZdVH3uHLm24j5Q6298Un4O",
                   "mDAyhkdhlv6qH9lT9WFzMCeML6ycMa1S8oWlybVG");
});
function show() {

	var Notification = window.Notification || window.mozNotification || window.webkitNotification;

	Notification.requestPermission(function (permission) {
		 console.log(permission);
	});

	function show() {
		window.setTimeout(function () {
			var instance = new Notification(
				"HTML5 Notifications", {
					body: "The Notifications API allows you to display notifications to the user on desktop computers and mobile devices."
				}
			);

			instance.onclick = function () {
				// Something to do
				return false;
			};
			instance.onerror = function () {
				// Something to do
				return false;
			};
			instance.onshow = function () {
				// Something to do
				return false;
			};
			instance.onclose = function () {
				// Something to do
				return false;
			};
		}, 1000);

		return false;
	}
}

function notifyMe() {
  Notification.requestPermission(function(result) {
	  console.log(Notification.permission);
  if (result === 'denied') {
    console.log('Permission wasn\'t granted. Allow a retry.');
    return;
  } else if (result === 'default') {
    console.log('The permission request was dismissed.');
    return;
  }
  // Do something with the granted permission.
  else if (result === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification(
				"Log Out Securely", {
					body: "Bye-bye."
				}
			);
  }
});
	
	
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification(
				"Log Out Securely", {
					body: "Bye-bye."
				}
			);
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification("Hi there!");
      }
    });
	console.log(Notification.permission);
  }

  // At last, if the user has denied notifications, and you 
  // want to be respectful there is no need to bother them any more.
}


function AutoNotify() {
	
var tomorrowDate = new Date();
if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification(
				"Log Out Securely", {
					body: tomorrowDate
				}
			);
			console.log("...")
  }
}

function TestNotify() {
	$.notify("Hello Button");
	
}
