function chooseFile(){document.getElementById("upload-image").style.visibility="visible",document.getElementById("habit-form").style.opacity="0.5"}function closeImageSelector(){document.getElementById("upload-image").style.visibility="hidden",document.getElementById("habit-form").style.opacity="1.0"}function saveImageSelector(e){document.getElementById("upload-image").style.visibility="hidden",document.getElementById("habit-form").style.opacity="1.0",document.getElementById("icon4").src=e,selectImage("icon4")}function daily_selection(e){document.getElementById("day1").checked=!1,document.getElementById("day2").checked=!1,document.getElementById("day3").checked=!1,document.getElementById(e).checked=!0,document.getElementById("others").value=""}function selectImage(e){document.getElementById("icon1").style.border="none",document.getElementById("icon2").style.border="none",document.getElementById("icon3").style.border="none",document.getElementById("icon4").style.border="none";var t=document.getElementById(e);t.style.border="5px solid #42A5F5","icon1"==e?document.getElementById("cropped").src="../../img/sleep.jpg":"icon2"==e?document.getElementById("cropped").src="../../img/salad.jpg":"icon3"==e&&(document.getElementById("cropped").src="../../img/run.jpg")}function error_checking(){var e=document.forms.habitForm.fullname.value,t=0,n=document.getElementById("cropped").src,o=0,c="";return $("#ck-button :checked").each(function(){c=c+$(this).val()+" "}),$("#daily-button :checked").each(function(){o=parseInt($(this).val())}),""==e?(console.log("Please enter the title for your habit"),t=1,$("#title_error").css("display","inline-block")):$("#title_error").css("display","none"),"default.jpg"==n.substr(n.length-11)?(console.log("Please select an icon for your habit"),t=1,$("#habit_icon_error").css("display","inline-block")):$("#habit_icon_error").css("display","none"),""==c?(console.log("Please enter the weekly frequency for the habit"),t=1,$("#weekly_frequency_error").css("display","inline-block")):$("#weekly_frequency_error").css("display","none"),0==o?($("#daily_frequency_error").css("display","none"),document.getElementById("others").value>0?o=document.getElementById("others").value:(console.log("Please enter the daily frequency for the habit"),t=1,$("#daily_frequency_error").css("display","inline-block"))):$("#daily_frequency_error").css("display","none"),t}function addHabit(){if(0==error_checking()){var e=Parse.Object.extend("Habit"),t=new e,n=document.getElementById("cropped").src,o=new Parse.File;if("file"==n.substring(0,4)||"http"==n.substring(0,4)){var c=n.substr(n.length-5);if("p.jpg"==c){var r=Parse.Object.extend("Image"),l=new Parse.Query(r);l.equalTo("name","sleep"),l.find({success:function(e){for(var n=0;n<e.length;n++){o=e[n].get("Image");var c=0,r=0,l=document.forms.habitForm.fullname.value,a="";$("#ck-button :checked").each(function(){a=a+$(this).val()+" "});var i=0;$("#daily-button :checked").each(function(){i=parseInt($(this).val())}),document.getElementById("others").value&&(i=parseInt(document.getElementById("others").value)),t.save({current_value:c,daily_frequency:i,daily_current:0,icon_image:o,max_value:r,title:l,user_id:Parse.User.current(),weekly_frequency:a},{success:function(e){console.log("Successfully logged in!"),$("#modal_save_data").modal("show")},error:function(e,t){console.log("Did not insert correctly")}});break}},error:function(e){alert(e)}})}else if("d.jpg"==c){var r=Parse.Object.extend("Image"),l=new Parse.Query(r);l.equalTo("name","salad"),l.find({success:function(e){for(var n=0;n<e.length;n++){o=e[n].get("Image");var c=0,r=0,l=document.forms.habitForm.fullname.value,a="";$("#ck-button :checked").each(function(){a=a+$(this).val()+" "});var i=0;$("#daily-button :checked").each(function(){i=parseInt($(this).val())}),document.getElementById("others").value&&(i=parseInt(document.getElementById("others").value)),t.save({current_value:c,daily_frequency:i,daily_current:0,icon_image:o,max_value:r,title:l,user_id:Parse.User.current(),weekly_frequency:a},{success:function(e){console.log("Successfully logged in!"),$("#modal_save_data").modal("show")},error:function(e,t){console.log("Did not insert correctly")}});break}},error:function(e){alert(e)}})}else if("n.jpg"==c){var r=Parse.Object.extend("Image"),l=new Parse.Query(r);l.equalTo("name","run"),l.find({success:function(e){for(var n=0;n<e.length;n++){o=e[n].get("Image");var c=0,r=0,l=document.forms.habitForm.fullname.value,a="";$("#ck-button :checked").each(function(){a=a+$(this).val()+" "});var i=0;$("#daily-button :checked").each(function(){i=parseInt($(this).val())}),document.getElementById("others").value&&(i=parseInt(document.getElementById("others").value)),t.save({current_value:c,daily_frequency:i,daily_current:0,icon_image:o,max_value:r,title:l,user_id:Parse.User.current(),weekly_frequency:a},{success:function(e){console.log("Successfully logged in!"),$("#modal_save_data").modal("show")},error:function(e,t){console.log("Did not insert correctly")}});break}},error:function(e){alert(e)}})}}else{var a=n.split("base64,")[1],i=($("#profilePhotoFileUpload")[0],document.getElementById("profilePhotoFileUpload").value.split(/(\\|\/)/g).pop());o=new Parse.File(i,{base64:a});var d=0,s=0,u=document.forms.habitForm.fullname.value,m="";$("#ck-button :checked").each(function(){m=m+$(this).val()+" "});var y=0;$("#daily-button :checked").each(function(){y=parseInt($(this).val())}),document.getElementById("others").value&&(y=parseInt(document.getElementById("others").value)),t.save({current_value:d,daily_frequency:y,daily_current:0,icon_image:o,max_value:s,title:u,user_id:Parse.User.current(),weekly_frequency:m},{success:function(e){console.log("Successfully logged in!"),$("#modal_save_data").modal("show")},error:function(e,t){console.log("Did not insert correctly")}})}}}$(document).ready(function(){Parse.initialize("ULppY5RxxZUo8yekihZdVH3uHLm24j5Q6298Un4O","mDAyhkdhlv6qH9lT9WFzMCeML6ycMa1S8oWlybVG"),null!=Parse.User.current()&&Parse.User.current().authenticated()||(window.location.href="login.html")}),$("#others").on("input",function(e){document.getElementById("day1").checked=!1,document.getElementById("day2").checked=!1,document.getElementById("day3").checked=!1});var cropper;window.onload=function(){var e={imageBox:".imageBox",thumbBox:".thumbBox",spinner:".spinner",imgSrc:"../../img/default.jpg"};cropper=new cropbox(e),document.querySelector("#profilePhotoFileUpload").addEventListener("change",function(){var t=new FileReader;t.onload=function(t){e.imgSrc=t.target.result,cropper=new cropbox(e)},t.readAsDataURL(this.files[0]),this.files=[]}),document.querySelector("#btnCrop").addEventListener("click",function(){var e=cropper.getDataURL();document.getElementById("cropped").src=e,document.getElementById("upload-image").style.visibility="hidden",document.getElementById("habit-form").style.opacity="1.0",saveImageSelector(e)}),document.querySelector("#btnZoomIn").addEventListener("click",function(){cropper.zoomIn()}),document.querySelector("#btnZoomOut").addEventListener("click",function(){cropper.zoomOut()})};