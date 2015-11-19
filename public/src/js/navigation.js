$( document ).ready(function() {
  Parse.initialize("ULppY5RxxZUo8yekihZdVH3uHLm24j5Q6298Un4O",
                   "mDAyhkdhlv6qH9lT9WFzMCeML6ycMa1S8oWlybVG");	  	

			   
});


function Logout() {	
	window.location.href = "login.html";	
	Parse.User.logOut();
}

