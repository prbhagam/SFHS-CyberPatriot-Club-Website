var input = document.getElementById("confirm_password");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById('signup').click();
  }
});

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    window.location.replace("../dashboard")

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
  } else {
    // document.getElementById('user_div').style.display = "none";
    document.getElementById('login_div').style.display = "block";
  }
});

function signup () {
  var userEmail = document.getElementById('email_field').value;
  var userPass = document.getElementById('password_field').value;
  var confirmPass = document.getElementById('confirm_password').value;

  if (userPass != confirmPass) {
      document.getElementById('user_error').innerHTML = "<strong>The two passwords must match.</strong>"
  } else {
      firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).then(function() {
          var user = firebase.auth().currentUser;
          var chngUsername = document.getElementById("username_field").value;
          user.updateProfile({
              displayName: chngUsername
            }).then(function() {
              window.location.replace("../dashboard")
            }).catch(function(error) {
              var errorCode = error.code;
              var errorMessage = error.message;
            });
  
          // user.sendEmailVerification().then(function() {
          // }).catch(function(error) {
          // window.alert("Error: " + error.message);
          // });
  
      }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          document.getElementById('user_error').innerHTML = "<strong>"+errorMessage+"</strong>";
        });
        var user = firebase.auth().currentUser;
  }


}

function refresh() {
  window.location.reload();
}