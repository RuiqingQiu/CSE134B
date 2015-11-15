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
			document.getElementById("cropped").alt = current_object.get('icon_image')._name;
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
function saveEditedHabit(){
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
							var habit = Parse.Object.extend("Habit");
						    // var currUser = Parse.User.current();
						    var query = new Parse.Query(habit);
							query.equalTo("objectId", QueryString.objectID);
						    query.get(QueryString.objectID, {
						        success: function(habit) {
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
									habit.set("daily_frequency", daily_freq);
									habit.set("title", habit_title);
									habit.set("weekly_frequency", weekly_freq);
									habit.set("icon_image", parseFile);
						            habit.save({
						                success: function(obj) {
						                    console.log("successfully saved");
						                },
						                error: function(obj, error) {
						                    alert("Error: " + error.code + " " + error.message);
						                }
						            });
						        },
						        error: function(obj, error) {
						            alert("Error: " + error.code + " " + error.message);
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
							var habit = Parse.Object.extend("Habit");
						    // var currUser = Parse.User.current();
						    var query = new Parse.Query(habit);
							query.equalTo("objectId", QueryString.objectID);
						    query.get(QueryString.objectID, {
						        success: function(habit) {
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
									habit.set("daily_frequency", daily_freq);
									habit.set("title", habit_title);
									habit.set("weekly_frequency", weekly_freq);
									habit.set("icon_image", parseFile);
						            habit.save({
						                success: function(obj) {
						                    console.log("successfully saved");
						                },
						                error: function(obj, error) {
						                    alert("Error: " + error.code + " " + error.message);
						                }
						            });
						        },
						        error: function(obj, error) {
						            alert("Error: " + error.code + " " + error.message);
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
							parseFile = images[i].get("Image"); 
							var habit = Parse.Object.extend("Habit");
						    // var currUser = Parse.User.current();
						    var query = new Parse.Query(habit);
							query.equalTo("objectId", QueryString.objectID);
						    query.get(QueryString.objectID, {
						        success: function(habit) {
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
									habit.set("daily_frequency", daily_freq);
									habit.set("title", habit_title);
									habit.set("weekly_frequency", weekly_freq);
									habit.set("icon_image", parseFile);
						            habit.save({
						                success: function(obj) {
						                    console.log("successfully saved");
						                },
						                error: function(obj, error) {
						                    alert("Error: " + error.code + " " + error.message);
						                }
						            });
						        },
						        error: function(obj, error) {
						            alert("Error: " + error.code + " " + error.message);
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
			else{
				var habit = Parse.Object.extend("Habit");
			    // var currUser = Parse.User.current();
			    var query = new Parse.Query(habit);
			    query.equalTo("objectId", QueryString.objectID);
			    query.get(QueryString.objectID, {
			        success: function(habit) {
			        	console.log("find object");
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
						habit.set("daily_frequency", daily_freq);
						habit.set("title", habit_title);
						habit.set("weekly_frequency", weekly_freq);
						habit.set("icon_image", parseFile);
			            habit.save({
			                success: function(obj) {
			                    console.log("successfully saved");
			                },
			                error: function(obj, error) {
			                    alert("Error: " + error.code + " " + error.message);
			                }
			            });
			        },
			        error: function(obj, error) {
			            alert("Error: " + error.code + " " + error.message);
			        }
			    });
			}
		}
		else{
			console.log("enter here");
			var base64 = url.split('base64,')[1];
			var fileUploadControl = $("#profilePhotoFileUpload")[0];
			var name = document.getElementById("profilePhotoFileUpload").value.split(/(\\|\/)/g).pop();//the image
			parseFile = new Parse.File(name, { base64: base64 });
			//Fields from the form table 
			var habit = Parse.Object.extend("Habit");
		    var query = new Parse.Query(habit);
		    query.equalTo("objectId", QueryString.objectID);
		    query.get(QueryString.objectID, {
		        success: function(habit) {
		        	console.log("find object");
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
					habit.set("daily_frequency", daily_freq);
					habit.set("title", habit_title);
					habit.set("weekly_frequency", weekly_freq);
					habit.set("icon_image", parseFile);
		            habit.save({
		                success: function(obj) {
		                    console.log("successfully saved");
		                },
		                error: function(obj, error) {
		                    alert("Error: " + error.code + " " + error.message);
		                }
		            });
		        },
		        error: function(obj, error) {
		            alert("Error: " + error.code + " " + error.message);
		        }
		    });
		}
	}

    
    
}
