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
const firestore = firebase.firestore();

// Check if the user is logged in
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.log("User is logged in:", user);
    // You can add more logic here if needed
    loadAppointments(); // Load appointments only if the user is logged in
  } else {
    // No user is signed in.
    console.log("User is not logged in");
    // Redirect to login page or take appropriate action
    window.location.href = '/login.html';
  }
});

// Function to load appointments into the table
function loadAppointments() {
  firestore.collection('appointments').get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      var data = doc.data();
      console.log(doc.id, " => ", data);
      document.querySelector('#appointment_data').innerHTML += `
        <tr class="appointment-row" data-id="${doc.id}">
          <td>${data.name}</td>
          <td>${data.course}</td>
          <td>${data.email}</td>
          <td>${data['date of appointment']}</td>
          <td>${data['time of appointment']}</td>
          <td>${data.notes}</td>
          <td>${data.status}</td>
          <td><button class="btn btn-primary btn-sm">Select</button></td>
        </tr>
      `;
    });

    // Add event listeners to the rows for navigation
    var appointmentRows = document.querySelectorAll('.appointment-row');
    appointmentRows.forEach(function(row) {
      row.addEventListener('click', function() {
        var appointmentId = row.getAttribute('data-id');
        window.location.href = `appointmentDetails.html?id=${appointmentId}`;
      });
    });
  });
}
