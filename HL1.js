// Move button on mouse over
const b = document.querySelector(".noButton");
b.addEventListener("mouseover", moveHover);

function moveHover() {
    const i = Math.floor(Math.random() * 1200) + 1;
    const j = Math.floor(Math.random() * 650) + 1;

    b.style.left = i + "px";
    b.style.top = j + "px";
}

// Get references to the buttons
const noButton = document.getElementById("noButton");
const yesButton = document.getElementById("yesButton");

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

// Initialize Firebase Database
const database = getDatabase(); // Initialize the database

// Event listener for "NO" button
noButton.addEventListener("click", () => {
    console.log("NO button clicked");
    saveResponse("NO");
});

// Event listener for "YES" button
yesButton.addEventListener("click", () => {
    console.log("YES button clicked");
    saveResponse("YES");
});

// Function to save response to Firebase
function saveResponse(response) {
    const responseData = {
        response: response,
        timestamp: new Date().toISOString() // Save the current timestamp
    };

    const dbRef = ref(database, 'responses'); // Set the reference correctly

    // Push the response data to Firebase
    push(dbRef, responseData) // Use `push` with the correct reference
        .then(() => {
            console.log(`Response saved: ${response}`);
        })
        .catch((error) => {
            console.error("Error saving response:", error);
        });
}

// Function to get responses from Firebase
function getResponses() {
    const dbRef = ref(database, 'DoYouLoveMe?'); // Reference to the responses node
    dbRef.on('value', (snapshot) => {
        const data = snapshot.val();
        let responsesList = "";

        for (let key in data) {
            responsesList += `${data[key].response} at ${data[key].timestamp}<br>`;
        }

        // Display responses in the HTML
        document.getElementById('responsesDisplay').innerHTML = responsesList;
    });
}

// Call the getResponses function when the page loads
window.onload = () => {
    getResponses();
};
