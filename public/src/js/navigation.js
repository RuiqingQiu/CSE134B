$( document ).ready(function() {
  Parse.initialize("ULppY5RxxZUo8yekihZdVH3uHLm24j5Q6298Un4O",
                   "mDAyhkdhlv6qH9lT9WFzMCeML6ycMa1S8oWlybVG");	  	

			   
});


function Logout() {	
	window.location.href = "login.html";	
	Parse.User.logOut();
}

/*
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
	showProgressbar: true,
	template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
		'<img data-notify="icon" class="img-circle pull-left">' +
		'<span data-notify="title">{1}</span>' +
		'<span data-notify="message">{2}</span>' +
		'<div style="margin-top:10px">' +
			'<p id=test style="text-align:center;">' +
			'<input class="addbutton" type="button" value="Confirm">' +
			'<input class="addbutton" type="button" value="Cancel" style="margin-left:5px" onclick="Logout()">' +
			'</p>' +
		'</div>' +
	'</div>'
});
}
*/
