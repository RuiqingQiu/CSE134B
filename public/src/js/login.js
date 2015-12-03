$(document).ready(function() {
  Parse.initialize("ULppY5RxxZUo8yekihZdVH3uHLm24j5Q6298Un4O",
    "mDAyhkdhlv6qH9lT9WFzMCeML6ycMa1S8oWlybVG");
  if (Parse.User.current() !== null && Parse.User.current().authenticated()) {
    window.location.href = "welcome.html";
  }
  $('.loginButton').click(logIn);
  $('.signUpButton').click(signUp);
});

function logIn(e) {
  var username = $("#usermail").val();
  var password = $("#password").val();

  Parse.User.logIn(username, password, {
    success: function(user) {
      console.log("Successfully logged in!");
      window.location.href = "welcome.html";
    },

    error: function(user, error) {
      console.log("error!");
      errorMessage = error.message;
      switch (error.code) {
        case 101:
          errorMessage = "Invalid username or password."
          break;
        case 100:
          errorMessage = "Internet is disconnected."
          break;
      }
      showMessage(errorMessage);
    }
  });
  return false;
}

function signUp(e) {
  var username = $("#usermail").val();
  var password = $("#password").val();

  Parse.User.signUp(username, password, {
    ACL: new Parse.ACL()
  }, {
    success: function(user) {
      console.log("Successfully logged in!");
      window.location.href = "welcome.html";
    },

    error: function(user, error) {
      console.log("error!");
      errorMessage = error.message;
      switch (error.code) {
        case 202:
          errorMessage = "Username is already taken."
          break;
        case 100:
          errorMessage = "Internet is disconnected."
          break;
      }
      showMessage(errorMessage);
    }
  });
}

function showMessage(str) {
  var message = document.getElementById("message");
  message.textContent = str;
  message.style.display = "block";
  message.style.marginTop = 0;
  var signUpText = document.getElementById("signInMessage");
  signUpText.style.display = "none";
}

function onClickSignUp() {
  var signUpText = document.getElementById("signInMessage");
  signUpText.style.display = "block";
  var message = document.getElementById("message");
  message.style.display = "none";
}
