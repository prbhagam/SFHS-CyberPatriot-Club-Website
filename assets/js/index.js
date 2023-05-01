var input = document.getElementById("password_field");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById('login').click();
  }
});

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var userPass = document.getElementById('password_field').value;
      if (userPass === "cyberpatriot") {
        window.location.replace('/dashboard/myprofile/resetpwd.html');
      } else {
        window.location.replace("/dashboard")

        if(user != null) {
          var email_verified = user.emailVerfied;
          var email_id = user.email;
          var username = user.displayName;
          document.getElementById('welcome').innerHTML = "Hello" + username + "logged in with the email" + email_id + ".";
          if (email_verified === false) {
            document.getElementById('user_verified').innerHTML = "Please verify your email.";
            window.setInterval('refresh()', 3000);
          } else {
            document.getElementById('user_verified').innerHTML = "";
          }
        }
      }
    } else {
      document.getElementById('user_div').style.display = "none";
      document.getElementById('login_div').style.display = "block";
    }
  });

function refresh() {
  window.location.reload();
}

function login () {
  var userEmail = document.getElementById('email_field').value;
  var userPass = document.getElementById('password_field').value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    document.getElementById('user_error').innerHTML = "<strong>"+errorMessage+"</strong>";
  });
}
