var input = document.getElementById("email_field2");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("reset").click();
  }
});

function reset () {
    var auth = firebase.auth();
    var emailAddress = document.getElementById('email_field2').value;

    auth.sendPasswordResetEmail(emailAddress).then(function() {
    window.alert("Check your email for a reset password link.");
    window.location.replace("../");
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert('Error: ' + errorMessage);
    });
}