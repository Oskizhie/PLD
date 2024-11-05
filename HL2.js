// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDbuzin06pd9IkgYgq_H3RdsiG4LbRaqjs",
    authDomain: "panlan-d.firebaseapp.com",
    databaseURL: "https://panlan-d-default-rtdb.firebaseio.com",
    projectId: "panlan-d",
    storageBucket: "panlan-d.firebasestorage.app",
    messagingSenderId: "537300019461",
    appId: "1:537300019461:web:2a4bd0a585137451c46f6c",
    measurementId: "G-JCC970VPQR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app); // Initialize the database

// Get references to the input fields and the display element
const dateInput = document.getElementById("dateInput");
const timeInput = document.getElementById("timeInput");
const submitButton = document.querySelector(".submit");
const whenDisplay = document.getElementById("whenDisplay");

// Event listener for the submit button
submitButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the default button action
    const selectedDate = dateInput.value;
    const selectedTime = timeInput.value;

    if (selectedDate && selectedTime) {
        saveDateTimeToDatabase(selectedDate, selectedTime); // Save to the database
    } else {
        alert("Please select both a date and a time.");
    }
});

// Function to save date and time to Firebase
function saveDateTimeToDatabase(date, time) {
    const dateTimeData = {
        date: date,
        time: time,
        timestamp: new Date().toISOString() // Save the current timestamp
    };

    const dbRef = ref(database, 'celebration'); // Reference to the 'celebration' node

    // Push the date and time data to Firebase
    push(dbRef, dateTimeData)
        .then(() => {
            console.log(`Date: ${date}, Time: ${time} saved.`);
            
            // Navigate to the next page after a small delay to allow for data saving
            setTimeout(() => {
                window.location.href = "Hi_Love3.html"; // Redirect to the next page
            }, 1000);
        })
        .catch((error) => {
            console.error("Error saving date and time:", error);
        });
}

// Function to display saved date and time
function displayDateTime(data) {
    whenDisplay.innerHTML += `<p>Celebration planned for: ${data.date} at ${data.time}</p>`;
}

// Function to get existing dates and times from Firebase
function getDateTime() {
    const dbRef = ref(database, 'celebration'); // Reference to the 'celebration' node
    onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        whenDisplay.innerHTML = ""; // Clear previous display

        if (data) {
            for (let key in data) {
                displayDateTime(data[key]); // Display all saved date and time
            }
        }
    });
}

// Call the getDateTime function when the page loads
window.onload = () => {
    getDateTime();
};
