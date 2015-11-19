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
				console.log(cur_user.id + " was retrieved successfully.")
				// The object was retrieved successfully.
		
				document.getElementById("myenableswitch").checked = user.get("Enable_notification");
			},
			error: function(cur_user, error){
			console.log(cur_user.id + "was not retrieved successfully.")
			// The object was not retrieved successfully.
            // error is a Parse.Error with an error code and message.
			}
		});	
});


function progressBar() {

	var cur_user = Parse.User.current();
	var User = Parse.Object.extend("_User");
	var query = new Parse.Query(User);
	query.get(cur_user.id, {
		success:function(user) {
			console.log(cur_user.id + " was retrieved successfully.")
			// The object was retrieved successfully.
			var username = user.get("username");
            console.log(username);
	
            console.log(user.get("Enable_notification"));
			
			if (user.get("Enable_notification")) 
	{
	var notify = $.notify('<strong>Saving</strong> Do not close this page...', {
	type: 'success',
	allow_dismiss: true,
	showProgressbar: true
	});

	setTimeout(function() {
	notify.update('message', '<strong>Saving</strong> Page Data.');
	}, 1000);

	setTimeout(function() {
	notify.update('message', '<strong>Saving</strong> User Data.');
	}, 2000);

	setTimeout(function() {
	notify.update('message', '<strong>Saving</strong> Profile Data.');
	}, 3000);

	setTimeout(function() {
	notify.update('message', '<strong>Checking</strong> for errors.');
	}, 4000);
	}
	        
		},
		error: function(cur_user, error){
			console.log(cur_user.id + "was not retrieved successfully.")
			// The object was not retrieved successfully.
            // error is a Parse.Error with an error code and message.
		}
	});
	
	
	 
}

function Notification(){
	
	var x = document.getElementById("myenableswitch").checked;
    console.log(x);
	
	// check enable of notification
	var cur_user = Parse.User.current();
	var User = Parse.Object.extend("_User");
	var query = new Parse.Query(User);
	query.get(cur_user.id, {
		success:function(user) {
			console.log(cur_user.id + " was retrieved successfully.")
			// The object was retrieved successfully.
			var username = user.get("username");
            console.log(username);
	
            console.log(user.get("Enable_notification"));
	        user.set("Enable_notification", x);
			
			user.save(null, {
				success: function(user) {
				// Execute any logic that should take place after the object is saved.
				alert('New object created with objectId: ' + user.id);
				var user = Parse.User.current();
				var username = user.get("username");
				console.log(user.get("Enable_notification"));
				},
				error: function(user, error) {
				// Execute any logic that should take place if the save fails.
				// error is a Parse.Error with an error code and message.
				alert('Failed to create new object, with error code: ' + error.message);
				}
			});
		},
		error: function(cur_user, error){
			console.log(cur_user + "was not retrieved successfully.")
			// The object was not retrieved successfully.
            // error is a Parse.Error with an error code and message.
		}
	});
	
	
	
	

		
}