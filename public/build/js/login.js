function logIn(e){var s=$("#usermail").val(),n=$("#password").val();return Parse.User.logIn(s,n,{success:function(e){console.log("Successfully logged in!"),window.location.href="welcome.html"},error:function(e,s){switch(console.log("error!"),errorMessage=s.message,s.code){case 101:errorMessage="Invalid username or password.";break;case 100:errorMessage="Internet is disconnected."}showMessage(errorMessage)}}),!1}function signUp(e){var s=$("#usermail").val(),n=$("#password").val();Parse.User.signUp(s,n,{ACL:new Parse.ACL},{success:function(e){console.log("Successfully logged in!"),window.location.href="welcome.html"},error:function(e,s){switch(console.log("error!"),errorMessage=s.message,s.code){case 202:errorMessage="Username is already taken.";break;case 100:errorMessage="Internet is disconnected."}showMessage(errorMessage)}})}function showMessage(e){var s=document.getElementById("message");s.textContent=e,s.style.display="block",s.style.marginTop=0;var n=document.getElementById("signInMessage");n.style.display="none"}function onClickSignUp(){var e=document.getElementById("signInMessage");e.style.display="block";var s=document.getElementById("message");s.style.display="none"}$(document).ready(function(){Parse.initialize("ULppY5RxxZUo8yekihZdVH3uHLm24j5Q6298Un4O","mDAyhkdhlv6qH9lT9WFzMCeML6ycMa1S8oWlybVG"),null!==Parse.User.current()&&Parse.User.current().authenticated()&&(window.location.href="welcome.html")});