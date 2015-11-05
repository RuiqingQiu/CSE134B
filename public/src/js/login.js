$( document ).ready(function() {
  Parse.initialize("ULppY5RxxZUo8yekihZdVH3uHLm24j5Q6298Un4O",
                   "mDAyhkdhlv6qH9lT9WFzMCeML6ycMa1S8oWlybVG");
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
          showMessage(error.message);
        }
      });

      return false;
}

function signUp(e) {
      var username = $("#usermail").val();
      var password = $("#password").val();

      Parse.User.signUp(username, password, { ACL: new Parse.ACL() }, {
        success: function(user) {
          console.log("Successfully logged in!");
          window.location.href = "welcome.html";
        },

        error: function(user, error) {
          console.log("error!");
          showMessage(error.message);
        }
      });
}

function showMessage(str) {
  var message = document.getElementById("message");
  message.textContent = str;
  message.style.display = "block";
  var signUpText = document.getElementById("signInMessage");
  signUpText.style.display = "none";
}

function onClickSignUp() {
  var signUpText = document.getElementById("signInMessage");
  signUpText.style.display = "block";
  var message = document.getElementById("message");
  message.style.display = "none";

}
