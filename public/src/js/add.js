$( document ).ready(function() {
  Parse.initialize("ULppY5RxxZUo8yekihZdVH3uHLm24j5Q6298Un4O",
                   "mDAyhkdhlv6qH9lT9WFzMCeML6ycMa1S8oWlybVG");
    if(!Parse.User.current().authenticated()) {
    	window.location.href = "login.html";
	}
});
//Choosing a file, make opacity to 0.5
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

function addHabit(){
	var Habit = Parse.Object.extend("Habit");
	var habit = new Habit();
	var fileUploadControl = $("#profilePhotoFileUpload")[0];
	console.log(fileUploadControl);
	var name = document.getElementById("profilePhotoFileUpload").value.split(/(\\|\/)/g).pop();//the image
	var url = document.getElementById("cropped").src;
	console.log(url);
	var parseFile;
	
	if (url.substring(0, 4) == "file") {
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
					     console.log(weekly_freq);
					     
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
						break;
           
				}
			},
			    error: function(error) {
			        alert(error);
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
					     console.log(weekly_freq);
					     
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
						break;
           
				}
			},
			    error: function(error) {
			        alert(error);
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
						console.log("hello");
						console.log(images[i].get("Image"));
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
					     console.log(weekly_freq);
					     
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
						break;
           
				}
			},
			    error: function(error) {
			        alert(error);
			    }
			});

		}
	}
	else{
		var base64 = url.split('base64,')[1];
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
	     console.log(weekly_freq);
	     
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