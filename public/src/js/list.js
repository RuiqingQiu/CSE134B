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
            // need to confirm first
            var habit = Parse.Object.extend("Habit");
            // var currUser = Parse.User.current();
            var query = new Parse.Query(habit);
            // query.equalTo("user_id", currUser);
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
                    if(daily_current < obj.get("daily_frequency")){
                        obj.set("daily_current", ++daily_current);
                        obj.save({
                            success: function(obj) {
                                var msg = $(el).find(".message-today");
                                msg.children(".daily-current").text(daily_current);
                                msg.css("visibility","visible");

                                $(el).find(".progress").attr('x2', 150);
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

        function editHabit(id){
            location.href='edit.html?objectID='+id;
        }

        function renderHBTemplate(tmpl, data, parent){
            var template = Handlebars.compile($(tmpl).html());
            $(parent).append(template(data));
        }

       