function TestNotify(){$.notify("Hello Button")}$(document).ready(function(){Parse.initialize("ULppY5RxxZUo8yekihZdVH3uHLm24j5Q6298Un4O","mDAyhkdhlv6qH9lT9WFzMCeML6ycMa1S8oWlybVG"),null==Parse.User.current()||null==Parse.User.current().authenticated()?window.location.href="login.html":console.log(Parse.User.current().id);var e=Parse.User.current(),t=Parse.Object.extend("_User"),n=new Parse.Query(t);n.get(e.id,{success:function(e){var t=e.get("username");console.log(t),console.log(e.get("Enable_notification")),e.get("Enable_notification")&&$.notify({title:"Welcome",message:"Hello, Dear "+t+" !!!"},{newest_on_top:!0,placement:{from:"top",align:"right"},animate:{enter:"animated zoomInDown",exit:"animated zoomOutUp"},type:"minimalist",showProgressbar:!0,delay:2e3,template:'<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert"><span data-notify="title">{1}</span><span data-notify="message">{2}</span></div>'})},error:function(e,t){console.log("User was not retrieved successfully.")}})});