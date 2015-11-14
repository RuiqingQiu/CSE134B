var QueryString = function () {
  // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  } 
    return query_string;
}();

$(document).ready(function() {
	Parse.initialize("ULppY5RxxZUo8yekihZdVH3uHLm24j5Q6298Un4O",
                   "mDAyhkdhlv6qH9lT9WFzMCeML6ycMa1S8oWlybVG");

    // console.log(Parse.User.current());
    if(Parse.User.current() == null || Parse.User.current().authenticated() == null) {
        window.location.href = "login.html";
    }
    getHabit();
});

function getHabit(){
    // need to confirm first
    var habit = Parse.Object.extend("Habit");
    // var currUser = Parse.User.current();
    var query = new Parse.Query(habit);
    query.equalTo("objectId", QueryString.objectID);
    query.find({
        success: function(objs) {
        	var current_object = objs[0];
        	document.forms["habitForm"]["fullname"].value = current_object.get('title');
        	document.getElementById("icon4").src = current_object.get('icon_image')._url;
        	document.getElementById("cropped").src = current_object.get('icon_image')._url;

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


function saveEditedHabit(el){            
    var habit = Parse.Object.extend("Habit");
    var query = new Parse.Query(habit);
    var toDelete = query.get($(el).attr("id"), {
        success: function(obj) {
            var daily_current = obj.get("daily_current");
            if(daily_current < obj.get("daily_frequency")){
                obj.set("daily_current", ++daily_current);
                obj.save({
                    success: function(obj) {
                        var msg = $(el).find(".message-today");
                        // alert(daily_current);
                        msg.children(".daily-current").text(daily_current);
                        msg.css("visibility","visible");
                    },
                    error: function(obj, error) {
                        alert("Error: " + error.code + " " + error.message);
                    }
                });
            }
        },
        error: function(obj, error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });
}