// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIF6nLqmxJNSDDIkowszT5-WPa5p-c3AQ",
  authDomain: "kaappbai.firebaseapp.com",
  projectId: "kaappbai",
  storageBucket: "kaappbai.appspot.com",
  messagingSenderId: "771116900014",
  appId: "1:771116900014:web:786d476e5c6011c234173f",
  measurementId: "G-THDRFEXG6P"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth();
const firestore = firebase.firestore(); // Add this line to initialize Firestore

// Set up our register function
function register() {
    // Get all our input fields
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Whoa! Kindly check your details');
        return;
        // Don't continue running the code
    }

    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
        .then(function () {
            // Declare user variable
            var user = auth.currentUser;

            // Add this user to Firestore
            var user_data = {
                email: email,
                last_login: new Date()
            };

            firestore.collection('users').doc(user.uid).set(user_data)
                .then(function () {
                    // Done
                    alert('User Created!!');
                })
                .catch(function (error) {
                    alert('Error adding user to Firestore: ' + error.message);
                });
        })
        .catch(function (error) {
            // Firebase will use this to alert of its errors
            var error_message = error.message;
            alert(error_message);
        });
}

// Set up our login function
function login() {
    // Get all our input fields
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email or Password is Outta Line!!');
        return;
        // Don't continue running the code
    }

    auth.signInWithEmailAndPassword(email, password)
        .then(function () {
            // Declare user variable
              // User has successfully logged in
            alert('User Logged In!!');
            window.location.href = "admin/index.html";
        })
        .catch(function (error) {
            // Firebase will use this to alert of its errors
            var error_message = error.message;
            alert(error_message);
        });
}

// Validate Functions
function validate_email(email) {
    var expression = /^[^@]+@\w+(\.\w+)+\w$/;
    return expression.test(email); // Returns true if email is good, false otherwise
}

function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    return password.length >= 6;
}

function validate_field(field) {
    return field != null && field.length > 0;
}
