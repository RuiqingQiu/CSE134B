$( document ).ready(function() {
  Parse.initialize("ULppY5RxxZUo8yekihZdVH3uHLm24j5Q6298Un4O",
                   "mDAyhkdhlv6qH9lT9WFzMCeML6ycMa1S8oWlybVG");
	 if(Parse.User.current() == null || Parse.User.current().authenticated() == null) {
                window.location.href = "login.html";
            }
			else{
				console.log(Parse.User.current().id);
			}
			
			var cur_user = Parse.User.current();
			
		//console.log(cur_user);
		var User = Parse.Object.extend("_User");
		var query = new Parse.Query(User);
		query.get(cur_user.id, {
			success:function(user) {
			var username = user.get("username");
            console.log(username);
	
            console.log(user.get("Enable_notification"));
			
			if (user.get("Enable_notification")) {
			
			$.notify({
				title: 'Welcome',
				message: 'Hello, Dear' +username + ' !!!'
			},{
					newest_on_top: true,
					placement: {
					from: "top",
					align: "right"
					},
					type: 'minimalist',
					delay: 1000,
					template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
					'<span data-notify="title">{1}</span>' +
					'<span data-notify="message">{2}</span>' +
					'</div>'
			});
			}
		},
			error: function(cur_user, error){
			console.log("Us was not retrieved successfully.")
			// The object was not retrieved successfully.
            // error is a Parse.Error with an error code and message.
			}
		});	
});


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
