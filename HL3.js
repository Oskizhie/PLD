// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";

// Firebase configuration
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
const database = getDatabase(app);

// Function to save location choice to Firebase and redirect
function saveLocationAndRedirect(location, redirectUrl) {
    const dbRef = ref(database, 'anniversaryPlans'); // Node to store anniversary plan choices
    const locationData = {
        location: location,
        timestamp: new Date().toISOString()
    };

    // Push data to Firebase
    push(dbRef, locationData)
        .then(() => {
            console.log(`Location: ${location} saved.`);
            window.location.href = redirectUrl; // Redirect to the specified page
        })
        .catch((error) => {
            console.error("Error saving location choice:", error);
        });
}

// Event listeners for each button
document.querySelector(".B1").addEventListener("click", (event) => {
    event.preventDefault();
    saveLocationAndRedirect("SM DASMA", "SM.html");
});

document.querySelector(".B2").addEventListener("click", (event) => {
    event.preventDefault();
    saveLocationAndRedirect("SAMGYUP", "Hi_Love4.html");
});

document.querySelector(".B3").addEventListener("click", (event) => {
    event.preventDefault();
    saveLocationAndRedirect("UNLI WINGS", "Hi_Love4.html");
});
