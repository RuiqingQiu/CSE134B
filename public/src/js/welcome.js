$( document ).ready(function() {
  Parse.initialize("ULppY5RxxZUo8yekihZdVH3uHLm24j5Q6298Un4O",
                   "mDAyhkdhlv6qH9lT9WFzMCeML6ycMa1S8oWlybVG");
	 if(Parse.User.current() == null || Parse.User.current().authenticated() == null) {
                window.location.href = "login.html";
            }
			else{
				console.log(Parse.User.current().id);
			}
});

function notifyMe() {

  

 
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
