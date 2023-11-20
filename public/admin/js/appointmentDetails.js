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

// Function to load appointment details
function loadAppointmentDetails() {
  // Get the appointment ID from the URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const appointmentId = urlParams.get('id');

  // Retrieve appointment details using the ID
  firestore.collection('appointments').doc(appointmentId).get().then(function(doc) {
    if (doc.exists) {
      var data = doc.data();
      console.log("Appointment Details: ", data);

      // Update the details_container with the appointment details
      document.getElementById('details_container').innerHTML = `
        <p>User ID: ${data.userID}</p>
        <p>Name: ${data.name}</p>
        <p>Course: ${data.course}</p>
        <p>Email: ${data.email}</p>
        <p>Date of Appointment: ${data['date of appointment']}</p>
        <p>Time of Appointment: ${data['time of appointment']}</p>
        <p>Notes: ${data.notes}</p>
        <p>Status: ${data.status}</p>
        
        <!-- Add a button for updating status -->
        <button id="updateStatusBtn" class="btn btn-primary">Accept Appointment</button>
      `;

      // Add a click event listener to the button
      document.getElementById('updateStatusBtn').addEventListener('click', function() {
        // Call the function to update the status
        updateStatus();
      });

    } else {
      console.log("No such document!");
    }
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });
}

// Function to update appointment status
function updateStatus() {
  // Get the appointment ID from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const appointmentId = urlParams.get('id');

  // Assuming you have a 'appointments' collection in Firestore
  const appointmentRef = firestore.collection('appointments').doc(appointmentId);

  // Update the status field to 'accepted'
  appointmentRef.update({
    status: 'accepted'
  }).then(function() {
    console.log("Appointment status updated successfully!");
    // Reload appointment details after update
    loadAppointmentDetails();
  }).catch(function(error) {
    console.error("Error updating status:", error);
  });
}

// Call the function to load appointment details when the page loads
document.addEventListener("DOMContentLoaded", function() {
  loadAppointmentDetails();
});
