        var CONST = {};
        CONST.PROGRESS_BAR_LENGTH = 150;
        // MSG.C
        var HABIT = {};
        HABIT.jsonArray =[];

        $(document).ready(function() {
            Parse.initialize("ULppY5RxxZUo8yekihZdVH3uHLm24j5Q6298Un4O",
                           "mDAyhkdhlv6qH9lT9WFzMCeML6ycMa1S8oWlybVG");

            if(Parse.User.current() == null || Parse.User.current().authenticated() == null) {
                window.location.href = "login.html";
            }
            listHabits();
        });

        function deleteHabit(id){
            var habit = Parse.Object.extend("Habit");
            var query = new Parse.Query(habit);
            var toDelete = query.get(id, {
                success: function(obj) {
                    obj.destroy({
                        success: function(obj) {
                            // floating text for delete success info
                            location.reload();
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

        function listHabits(){
            var habit = Parse.Object.extend("Habit");
            var query = new Parse.Query(habit);
            var currUser = Parse.User.current();
            query.equalTo("user_id", currUser);
            query.find({
                success: function(results) {
                    // var a = JSON.stringify(results);                    
                    for (var i = 0; i < results.length; i++){
                        var jsonData = {}
                        jsonData.id = results[i].id;
                        jsonData.title = results[i].get('title');
                        jsonData.icon_image = results[i].get('icon_image');
                        // jsonData.weekly_frequency = results[i].get('weekly_frequency');
                        jsonData.daily_current = results[i].get('daily_current');
                        jsonData.daily_frequency = results[i].get('daily_frequency');
                        jsonData.current_value = results[i].get('current_value');
                        console.log("current_value:"+jsonData.current_value);
                        jsonData.max_value = results[i].get('max_value');
                        if(jsonData.max_value > 0){
                            jsonData.progress = jsonData.current_value / jsonData.max_value * CONST.PROGRESS_BAR_LENGTH;
                        }else{
                            jsonData.progress = 0;
                        }
                        HABIT.jsonArray[i] = jsonData;
                    }
                    // console.log(HABIT.jsonArray);

                    renderHBTemplate($("#list-template"), HABIT.jsonArray, $("#habit-list"));

                    for (var j = 0; j < HABIT.jsonArray.length; j++){
                        setInterval(printLog, 1000);
                    }

                    $(".habit-entry .edit").click(function(event){
                        event.preventDefault();
                        var toEdit = $(this).closest(".habit-entry").attr("id");
                        editHabit(toEdit);
                    });

                    $(".habit-entry .del").click(function(event){
                        event.preventDefault();
                        var currentEntry = $(this).closest(".habit-entry");
                        $("#deleteConfirmation em").text($(currentEntry).find(".habit-name").text());
                        var toDelete = $(currentEntry).attr("id");

                        $("#deleteConfirmation .btn-delete").click(function(event){
                            event.preventDefault();
                            deleteHabit(toDelete);
                        });

                    });

                    $(".habit-entry .op-done").click(function(event){
                        event.preventDefault();
                        var toDo = $(this).closest(".habit-entry");
                        doHabit($(toDo));
                    });

                    $(".habit-entry .op-skip").click(function(event){
                        event.preventDefault();
                        var toSkip = $(this).closest(".habit-entry");
                        $(toSkip).find(".message-today").css("visibility","visible");
                    });

                },
                error: function(error) {
                    alert("Error: " + error.code + " " + error.message);
                }
            });
        }

        function doHabit(el){            
            var habit = Parse.Object.extend("Habit");
            var query = new Parse.Query(habit);
            var toDelete = query.get($(el).attr("id"), {
                success: function(obj) {
                    var daily_current = obj.get("daily_current");
                    var daily_total = obj.get("daily_frequency");
                    if(daily_current < daily_total){
                        obj.set("daily_current", ++daily_current);
                        obj.save({
                            success: function(obj) {
                                var msg = $(el).find(".message-today");
                                msg.children(".daily-current").text(daily_current);
                                msg.css("visibility","visible");
                                
                                if(daily_current == daily_total){

                                    // update continued days
                                    var max_value = $(el).find('max_value').text();
                                    var current_value = $(el).find('current_value').text();
                                    obj.set("current_value", ++current_value);

                                    // update max date
                                    if (current_value > max_value){
                                        obj.set("max_value", ++max_value);
                                    }
                                    obj.save({
                                        success: function(obj) {
                                            // current-value: set in view
                                            $(el).find(".current-value").text(current_value);

                                            if(max_value == current_value){
                                                // max-value: set in view
                                                console.log("max:"+ max_value);
                                                $(el).find(".max-value").text(max_value);
                                            }

                                            // update progress bar
                                            $(el).find(".progress").attr('x2', max_value != 0 ? (current_value / max_value * CONST.PROGRESS_BAR_LENGTH)  : 0);
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
                    // completed today's task
                    if(daily_current == daily_total){
                        // TODO: show different message

                    }
                },
                error: function(obj, error) {
                    alert("Error: " + error.code + " " + error.message);
                }
            });
        }

        function editHabit(id){
            location.href='edit.html?objectID='+id;
        }

        function printLog(){
            console.log("notification");
        }

        function renderHBTemplate(tmpl, data, parent){
            var template = Handlebars.compile($(tmpl).html());
            $(parent).append(template(data));
        }

        // chk today's day & change color for item w/ date not match (maybe also sort?)

       // ISSUE: which habit(s) should timer/notification work on?