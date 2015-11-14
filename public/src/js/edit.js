var GLOBAL = {};
GLOBAL.objectID = "ZAxIn2CEPh";

$(document).ready(function() {
	Parse.initialize("ULppY5RxxZUo8yekihZdVH3uHLm24j5Q6298Un4O",
                   "mDAyhkdhlv6qH9lT9WFzMCeML6ycMa1S8oWlybVG");

    // console.log(Parse.User.current());
    if(Parse.User.current() == null || Parse.User.current().authenticated() == null) {
        window.location.href = "login.html";
    }
    getHabit()
});

function getHabit(){
    // need to confirm first
    var habit = Parse.Object.extend("Habit");
    // var currUser = Parse.User.current();
    var query = new Parse.Query(habit);
    query.equalTo("objectId", GLOBAL.objectID);
    query.find({
        success: function(objs) {
        	var current_object = objs[0];
        	document.forms["habitForm"]["fullname"].value = current_object.get('title');
        	document.getElementById("icon4").src = current_object.get('icon_image')._url;
        	selectImage('icon4');
        	var weekly_freq = current_object.get('weekly_frequency');
        	console.log(weekly_freq);
        	weekly_array = weekly_freq.split(" ");
        	console.log(weekly_array);
        	for(var i = 0; i < weekly_array.length-1; i++){
	        	document.getElementById(weekly_array[i]).checked = true;
        	}
        	var daily_freq = current_object.get('daily_frequency');
        	console.log(daily_freq);
        	if(daily_freq <= 3){
	        	document.getElementById("day"+daily_freq).checked = true;
        	}
        	else{
	        	document.getElementById("others").value = daily_freq;
        	}
        },
        error: function(obj, error) {
            alert("Error: " + error.code + " " + error.message);
        }                
    });

    
}