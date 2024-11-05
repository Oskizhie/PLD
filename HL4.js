// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

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
const database = getDatabase(app); // Initialize the database

const rangeInput = document.getElementById('rangeInput');
const gif = document.getElementById('GIF');
const submitButton = document.getElementById('submitButton');

// Change GIF based on the range input
rangeInput.addEventListener('input', () => {
    const value = parseInt(rangeInput.value);
    if (value >= 1 && value <= 4) {
        gif.src = 'MB3.gif';
    } else if (value >= 5 && value <= 8) {
        gif.src = 'MB1.gif';
    } else if (value >= 9 && value <= 10) {
        gif.src = 'MB2.gif';
    }
});

// Event listener for the submit button
submitButton.addEventListener('click', () => {
    const excitementLevel = rangeInput.value; // Get the value from the range input
    saveExcitementToDatabase(excitementLevel); // Save to the database
});

// Function to save excitement level to Firebase
function saveExcitementToDatabase(level) {
    const excitementData = {
        excitementLevel: level,
        timestamp: new Date().toISOString() // Save the current timestamp
    };

    const dbRef = ref(database, 'excitementLevels'); // Reference to the 'excitementLevels' node

    // Push the excitement data to Firebase
    push(dbRef, excitementData)
        .then(() => {
            console.log(`Excitement level of ${level} saved.`);
            // Navigate to the end page after saving the data
            window.location.href = "end.html"; // Redirect to the end page
        })
        .catch((error) => {
            console.error("Error saving excitement level:", error);
        });
}
