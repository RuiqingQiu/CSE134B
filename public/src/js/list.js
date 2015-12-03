        var CONST = {};
        CONST.PROGRESS_BAR_LENGTH = 150;
        CONST.REPEAT_TIME = 1000 * 10;
        // MSG.C
        var HABIT = {};
        HABIT.jsonArray =[];

        $(document).ready(function() {
            Parse.initialize("ULppY5RxxZUo8yekihZdVH3uHLm24j5Q6298Un4O",
                           "mDAyhkdhlv6qH9lT9WFzMCeML6ycMa1S8oWlybVG");

            if(Parse.User.current() == null || Parse.User.current().authenticated() == null) {
                window.location.href = "login.html";
            }
            else{
                // $(document.body).append($('#modal_logout'));
            	listHabits();
            }
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
                        setInterval(notifyHabit, CONST.REPEAT_TIME, HABIT.jsonArray[j]);
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
                    $(".habit-entry .op-skip").click(function(event){
						event.preventDefault();
						var current = $(this).closest(".habit-entry");
						$(this).closest(".habit-entry").css({
							"filter": "grayscale(100%)",
							"-webkit-filter": "grayscale(100%)",
							"-moz-filter": "grayscale(100%)",
							"-ms-filter": "grayscale(100%)",
							"-o-filter": "grayscale(100%)",
							"-webkit-filter": "grayscale(1)"});

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
                                            var dimensions = {
                                                user_id: Parse.User.current().id,
                                                title: obj.get("title"),
                                                type: "Doing Habit"
                                            };
                                            Parse.Analytics.track('doingHabit', dimensions);
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
                    }else{
                        var msg = $(el).find(".message-today");
                        msg.children(".daily-current").text(daily_current);
                        msg.css("visibility","visible");
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

        function notifyHabit(obj) {
            $.notify({
                icon: obj.icon_image._url,
                title: obj.title,
                message: 'Did you do you the habit <em>'+ obj.title+'</em>',
                target: $(obj.id)
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
                template: '<div data-id='+obj.id+' data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
                    '<img data-notify="icon" class="img-circle pull-left" alt="icon">' +
                    '<span data-notify="title">{1}</span>' +
                    '<span data-notify="message">{2}</span>' +
                    '<div style="margin-top:10px">' +
                        '<p id=test style="text-align:center;">' +
                        '<input class="addbutton notif-confirm" type="button" value="Confirm" onclick="doHabit('+obj.id+');" data-notify="dismiss">' +
                        '<input class="addbutton notif-cancel" type="button" value="Cancel" style="margin-left:5px" data-notify="dismiss">' +
                        '</p>' +
                    '</div>' +
                '</div>'
            });
        }

        function renderHBTemplate(tmpl, data, parent){
            var template = Handlebars.compile($(tmpl).html());
            $(parent).append(template(data));
        }
