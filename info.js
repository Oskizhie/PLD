// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
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
const database = getDatabase(); // Initialize the database

// Get the form element
const nameForm = document.querySelector("form");
const usernameDisplay = document.getElementById("usernameDisplay");

nameForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById("name").value.toLowerCase();

    if (name === "jean" || name === "oski") {
        saveNameToDatabase(name); // Save name to the database
        window.location.href = "Hi_Love1.html"; // Redirect if name is valid
    } else {
        alert("YOU DON'T HAVE PERMISSION TO USE THIS SYSTEM");
    }
});

// Function to save name to Firebase
function saveNameToDatabase(name) {
    const nameData = {
        name: name,
        timestamp: new Date().toISOString() // Save the current timestamp
    };

    const dbRef = ref(database, 'usernames'); // Reference to the 'usernames' node

    // Push the name data to Firebase
    push(dbRef, nameData)
        .then(() => {
            console.log(`Name saved: ${name}`);
            getNames(); // Call function to display updated usernames
        })
        .catch((error) => {
            console.error("Error saving name:", error);
        });
}

// Function to get names from Firebase
function getNames() {
    const dbRef = ref(database, 'usernames'); // Reference to the 'usernames' node
    dbRef.on('value', (snapshot) => {
        const data = snapshot.val();
        let namesList = "";

        for (let key in data) {
            namesList += `${data[key].name} at ${data[key].timestamp}<br>`;
        }

        // Display names in the HTML
        usernameDisplay.innerHTML = namesList;
    });
}

// Call the getNames function when the page loads
window.onload = () => {
    getNames();
};
