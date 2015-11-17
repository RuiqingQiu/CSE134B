$( document ).ready(function() {
  Parse.initialize("ULppY5RxxZUo8yekihZdVH3uHLm24j5Q6298Un4O",
                   "mDAyhkdhlv6qH9lT9WFzMCeML6ycMa1S8oWlybVG");	  	

			   
});


function Logout() {
	
	Parse.User.logOut();

// Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification(
				"Log Out Succesfully", {
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

function test() {
$.notify({
	icon: 'https://randomuser.me/api/portraits/med/men/77.jpg',
	title: 'Byron Morgan',
	message: 'Momentum reduce child mortality effectiveness incubation empowerment connect.'
},{
	newest_on_top: true,
	placement: {
		from: "top",
		align: "right"
	},
	type: 'minimalist',
	delay: 5000,
	icon_type: 'image',
	template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
		'<img data-notify="icon" class="img-circle pull-left">' +
		'<span data-notify="title">{1}</span>' +
		'<span data-notify="message">{2}</span>' +
		'<div style="margin-top:10px">' +
			'<p id=test style="text-align:center;">' +
			'<input class="addbutton" type="button" value="Confirm">' +
			'<input class="addbutton" type="button" value="Cancel" style="margin-left:5px">' +
			'</p>' +
		'</div>' +
	'</div>'
});
}