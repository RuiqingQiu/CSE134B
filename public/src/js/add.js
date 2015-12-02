$(document).ready(function() {
  Parse.initialize("ULppY5RxxZUo8yekihZdVH3uHLm24j5Q6298Un4O",
                   "mDAyhkdhlv6qH9lT9WFzMCeML6ycMa1S8oWlybVG");
    if(Parse.User.current() == null || !Parse.User.current().authenticated()) {
        window.location.href = "login.html";
    }
});

function chooseFile() {
		document.getElementById("upload-image").style.visibility = "visible";
		document.getElementById("habit-form").style.opacity = "0.5";
}
//Close image selector and make opacity back to 1
function closeImageSelector() {
		document.getElementById("upload-image").style.visibility = "hidden";
		document.getElementById("habit-form").style.opacity = "1.0";
}
// Save and display the image
function saveImageSelector(image_data) {
		document.getElementById("upload-image").style.visibility = "hidden";
		document.getElementById("habit-form").style.opacity = "1.0";
		document.getElementById("icon4").src = image_data;
		selectImage('icon4');
}
//For making daily selection, only 1 is allowed
function daily_selection(val){
	document.getElementById('day1').checked = false;
	document.getElementById('day2').checked = false;
	document.getElementById('day3').checked = false;
	document.getElementById(val).checked = true;
	document.getElementById('others').value = "";
}
//For setting up trigger when others text field changed
$('#others').on('input',function(e){
	document.getElementById('day1').checked = false;
	document.getElementById('day2').checked = false;
	document.getElementById('day3').checked = false;
});



var cropper;
//Set up image cropper
window.onload = function() {
    var options =
    {
        imageBox: '.imageBox',
        thumbBox: '.thumbBox',
        spinner: '.spinner',
        imgSrc: '../../img/default.jpg'
    }
    cropper = new cropbox(options);
    document.querySelector('#profilePhotoFileUpload').addEventListener('change', function(){
        var reader = new FileReader();
        reader.onload = function(e) {
            options.imgSrc = e.target.result;
            cropper = new cropbox(options);
        }
        reader.readAsDataURL(this.files[0]);
        this.files = [];
    })
    document.querySelector('#btnCrop').addEventListener('click', function(){
        var img = cropper.getDataURL();
        document.getElementById("cropped").src = img;
        document.getElementById("upload-image").style.visibility = "hidden";
	   	document.getElementById("habit-form").style.opacity = "1.0";
	   	saveImageSelector(img);
    });
    document.querySelector('#btnZoomIn').addEventListener('click', function(){
        cropper.zoomIn();
    })
    document.querySelector('#btnZoomOut').addEventListener('click', function(){
        cropper.zoomOut();
    })

};

//Function for highlight images when selected
function selectImage(name) {
	//Clear all the other effects
	document.getElementById('icon1').style.border = "none";
	document.getElementById('icon2').style.border = "none";
	document.getElementById('icon3').style.border = "none";
	document.getElementById('icon4').style.border = "none";
	var image = document.getElementById(name);
	image.style.border = "5px solid #42A5F5";
	if(name == 'icon1'){
		document.getElementById("cropped").src = "../../img/sleep.jpg";
	}
	else if(name == 'icon2'){
		document.getElementById("cropped").src = "../../img/salad.jpg";
	}
	else if(name == 'icon3'){
		document.getElementById("cropped").src = "../../img/run.jpg";
	}
}
function error_checking(){
	//Habit title
	var habit_title = document.forms["habitForm"]["fullname"].value;
	var error = 0;
	var url = document.getElementById("cropped").src;
	var daily_freq = 0;
	var weekly_freq = "";
	$('#ck-button :checked').each(function() {
		weekly_freq = weekly_freq + $(this).val() + " "
	});
	$('#daily-button :checked').each(function(){
		daily_freq = parseInt($(this).val());
	});

	if(habit_title == ""){
		error = 1;
		$("#title_error").css("display", "inline-block");
	}
	else {
		$("#title_error").css("display", "none");
	}
	//Habit icon
	//If user didn't choose an image
	if(url.substr(url.length - 11) == "default.jpg"){
		error = 1;
		$("#habit_icon_error").css("display", "inline-block");
	}
	else {
		$("#habit_icon_error").css("display", "none");
	}
	//Weekly frequency
	if(weekly_freq == ""){
		//console.log("Please enter the weekly frequency for the habit");
		error = 1;
		$("#weekly_frequency_error").css("display", "inline-block");
	}
	else {
  	$("#weekly_frequency_error").css("display", "none");
	}
	//Daily frequency including others
	if(daily_freq == 0){
		$("#daily_frequency_error").css("display", "none");
		if(document.getElementById("others").value > 0){
			daily_freq = document.getElementById("others").value;
		}
		else{
			//console.log("Please enter the daily frequency for the habit");
			error = 1;
			$("#daily_frequency_error").css("display", "inline-block");
		}
	}
	else {
		$("#daily_frequency_error").css("display", "none");
	}
	return error;

}

function addHabit(){
	//If no error then insert into the table
	if(error_checking() == 0){
		var Habit = Parse.Object.extend("Habit");
		var habit = new Habit();
		var url = document.getElementById("cropped").src;
		var parseFile = new Parse.File();

		if (url.substring(0, 4) == "file" || url.substring(0, 4) == "http") {
			var lastFive = url.substr(url.length - 5); // => "Tabs1"
			//Sleep
			if(lastFive == "p.jpg"){
				var Image = Parse.Object.extend("Image");
				var query = new Parse.Query(Image);
				query.equalTo("name", "sleep");
				query.find({
			    	success: function(images) {
						for (var i = 0; i < images.length; i++) {
							parseFile = images[i].get("Image");
							//Fields from the form table
							var cur_val = 0; //Since add habit, default to be 0
							var max_val = 0; //Max number of times, default to 0
							var habit_title = document.forms["habitForm"]["fullname"].value; //The title of the habit
						    var weekly_freq = "";
						    var allVals = [];
						     $('#ck-button :checked').each(function() {
						     	weekly_freq = weekly_freq + $(this).val() + " "
						     });
						     var daily_freq = 0;
							 $('#daily-button :checked').each(function(){
								daily_freq = parseInt($(this).val());
							 });
							 if(document.getElementById("others").value){
								 daily_freq = parseInt(document.getElementById("others").value);
							 }

						     habit.save({
								  current_value: cur_val,
								  daily_frequency: daily_freq,
								  daily_current: 0,
								  icon_image: parseFile,
								  max_value:max_val,
								  title: habit_title,
								  user_id: Parse.User.current(),
								  weekly_frequency: weekly_freq
								}, {
								  success: function(habits) {
								    console.log("Successfully logged in!");
								    $('#modal_save_data').modal('show');
									//alert("Your habit has been added");
								    //window.location.href = "list.html";
								    var dimensions = {
								    	user_id: Parse.User.current().id,
								    	title: habits.get("title"),
								    	type: "Adding Habit"
								    };
								    Parse.Analytics.track('addHabit', dimensions);
								  },
								  error: function(habits, error) {
									  alert("Error: " + error.code + " " + error.message);
								  }
							  });
							break;

					}
				},
				    error: function(error) {
		            	alert("Error: " + error.code + " " + error.message);
				    }
				});
			}
			//Salad
			else if(lastFive == "d.jpg"){
				var Image = Parse.Object.extend("Image");
				var query = new Parse.Query(Image);
				query.equalTo("name", "salad");
				query.find({
			    	success: function(images) {
						for (var i = 0; i < images.length; i++) {
							parseFile = images[i].get("Image");
							//Fields from the form table
							var cur_val = 0; //Since add habit, default to be 0
							var max_val = 0; //Max number of times, default to 0
							var habit_title = document.forms["habitForm"]["fullname"].value; //The title of the habit
						    var weekly_freq = "";
						    var allVals = [];
						     $('#ck-button :checked').each(function() {
						     	weekly_freq = weekly_freq + $(this).val() + " "
						     });
						     var daily_freq = 0;
							 $('#daily-button :checked').each(function(){
								daily_freq = parseInt($(this).val());
							 });
							 if(document.getElementById("others").value){
								 daily_freq = parseInt(document.getElementById("others").value);
							 }
						     habit.save({
								  current_value: cur_val,
								  daily_frequency: daily_freq,
								  daily_current: 0,
								  icon_image: parseFile,
								  max_value:max_val,
								  title: habit_title,
								  user_id: Parse.User.current(),
								  weekly_frequency: weekly_freq
								}, {
								  success: function(habits) {
								    console.log("Successfully logged in!");
								   	$('#modal_save_data').modal('show');
								   	var dimensions = {
								    	user_id: Parse.User.current().id,
								    	title: habits.get("title"),
								    	type: "Adding Habit"
								    };
								    Parse.Analytics.track('addHabit', dimensions);
								  },
								  error: function(habits, error) {
									  alert("Error: " + error.code + " " + error.message);

								  }
							  });
							break;

					}
				},
				    error: function(error) {
		            	alert("Error: " + error.code + " " + error.message);
				    }
				});

			}
			//Run
			else if(lastFive == "n.jpg"){
				var Image = Parse.Object.extend("Image");
				var query = new Parse.Query(Image);
				query.equalTo("name", "run");
				query.find({
			    	success: function(images) {
						for (var i = 0; i < images.length; i++) {
							parseFile = images[i].get("Image");
							//Fields from the form table
							var cur_val = 0; //Since add habit, default to be 0
							var max_val = 0; //Max number of times, default to 0
							var habit_title = document.forms["habitForm"]["fullname"].value; //The title of the habit
						    var weekly_freq = "";
						    var allVals = [];
						     $('#ck-button :checked').each(function() {
						     	weekly_freq = weekly_freq + $(this).val() + " "
						     });
						     var daily_freq = 0;
							 $('#daily-button :checked').each(function(){
								daily_freq = parseInt($(this).val());
							 });
						     if(document.getElementById("others").value){
								 daily_freq = parseInt(document.getElementById("others").value);
							 }
						     habit.save({
								  current_value: cur_val,
								  daily_frequency: daily_freq,
								  daily_current: 0,
								  icon_image: parseFile,
								  max_value:max_val,
								  title: habit_title,
								  user_id: Parse.User.current(),
								  weekly_frequency: weekly_freq
								}, {
								  success: function(habits) {
								    console.log("Successfully logged in!");
								    $('#modal_save_data').modal('show');
								    var dimensions = {
								    	user_id: Parse.User.current().id,
								    	title: habits.get("title"),
								    	type: "Adding Habit"
								    };
								    Parse.Analytics.track('addHabit', dimensions);
								  },
								  error: function(habits, error) {
									  alert("Error: " + error.code + " " + error.message);

								  }
							  });
							break;

					}
				},
				    error: function(error) {
		            	alert("Error: " + error.code + " " + error.message);
				    }
				});

			}
		}
		else{
			var base64 = url.split('base64,')[1];
			var fileUploadControl = $("#profilePhotoFileUpload")[0];
			var name = document.getElementById("profilePhotoFileUpload").value.split(/(\\|\/)/g).pop();//the image
			parseFile = new Parse.File(name, { base64: base64 });
			//Fields from the form table
			var cur_val = 0; //Since add habit, default to be 0
			var max_val = 0; //Max number of times, default to 0
			var habit_title = document.forms["habitForm"]["fullname"].value; //The title of the habit
		    var weekly_freq = "";
		    var allVals = [];
		    $('#ck-button :checked').each(function() {
		    	weekly_freq = weekly_freq + $(this).val() + " "
		    });
		    var daily_freq = 0;
			 $('#daily-button :checked').each(function(){
				daily_freq = parseInt($(this).val());
			 });
			if(document.getElementById("others").value){
				daily_freq = parseInt(document.getElementById("others").value);
			}
		    habit.save({
				  current_value: cur_val,
				  daily_frequency: daily_freq,
				  daily_current: 0,
				  icon_image: parseFile,
				  max_value:max_val,
				  title: habit_title,
				  user_id: Parse.User.current(),
				  weekly_frequency: weekly_freq
				}, {
				  success: function(habits) {
				    console.log("Successfully logged in!");
				    $('#modal_save_data').modal('show');
				    var dimensions = {
								    	user_id: Parse.User.current().id,
								    	title: habits.get("title"),
								    	type: "Adding Habit"
								    };
								    Parse.Analytics.track('addHabit', dimensions);
				  },
				  error: function(habits, error) {
		            alert("Error: " + error.code + " " + error.message);

				  }
			  });
		}
	}
	//Else the error_checking will already display the missing fields
}
