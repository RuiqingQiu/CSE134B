$( document ).ready(function() {
  Parse.initialize("ULppY5RxxZUo8yekihZdVH3uHLm24j5Q6298Un4O",
                   "mDAyhkdhlv6qH9lT9WFzMCeML6ycMa1S8oWlybVG");
    if(!Parse.User.current().authenticated()) {
    	window.location.href = "login.html";
	}
});

function addHabit(){
	var Habit = Parse.Object.extend("Habit");
	var habit = new Habit();
	var Parsefile = Parse.Object.extend("");
	var fileUploadControl = $("#profilePhotoFileUpload")[0];
	var name = document.getElementById("profilePhotoFileUpload").value.split(/(\\|\/)/g).pop();//the image
	var url = document.getElementById("cropped").src;
	var base64       = url.split('base64,')[1];
	var parseFile    = new Parse.File(name, { base64: base64 });
	/* Fields from the form table */
	var cur_val = 0; //Since add habit, default to be 0
	var max_val = 0; //Max number of times, default to 0
	var habit_title = document.forms["habitForm"]["fullname"].value; //The title of the habit
    var weekly_freq = "";
    var allVals = [];
     $('#ck-button :checked').each(function() {
     	weekly_freq = weekly_freq + $(this).val() + " " 
     });
     console.log(weekly_freq);
     
     
	if (fileUploadControl.files.length > 0) {
	  //var file = fileUploadControl.files[0];	
	  //var parseFile = new Parse.File(name, file);
	  habit.save({
		  current_value: cur_val,
		  daily_frequency: 3,
		  daily_current: 0,
		  icon_image: parseFile,
		  max_value:max_val,
		  title: habit_title,
		  user_id: Parse.User.current(),
		  weekly_frequency: weekly_freq	  
		}, {
		  success: function(gameScore) {
		    console.log("Successfully logged in!");
		    //window.location.href = "list.html";
		    alert("Your habit has been added");
		  },
		  error: function(gameScore, error) {
		    console.log("Did not insert correctly");
	
		  }
		});
	}
	
}