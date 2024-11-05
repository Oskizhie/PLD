// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDbuzin06pd9IkgYgq_H3RdsiG4LbRaqjs",
    authDomain: "panlan-d.firebaseapp.com",
    databaseURL: "https://panlan-d-default-rtdb.firebaseio.com",
    projectId: "panlan-d",
    storageBucket: "panlan-d.appspot.com",
    messagingSenderId: "537300019461",
    appId: "1:537300019461:web:2a4bd0a585137451c46f6c",
    measurementId: "G-JCC970VPQR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

// Helper function to save the selected restaurant to Firebase and navigate to the next page
function saveChoiceAndNavigate(restaurant) {
    const dbRef = ref(database, 'SMChoices'); // Reference to Firebase node
    const choiceData = { restaurant: restaurant, timestamp: new Date().toISOString() };

    push(dbRef, choiceData)
        .then(() => {
            console.log(`Saved choice: ${restaurant}`);
            window.location.href = "Hi_Love4.html"; // Navigate to the next page
        })
        .catch((error) => {
            console.error("Error saving choice:", error);
        });
}

// Add event listeners to each button for Firebase storage and navigation
document.querySelector('.R1').addEventListener('click', () => saveChoiceAndNavigate("Jollibee"));
document.querySelector('.R2').addEventListener('click', () => saveChoiceAndNavigate("McDonalds"));
document.querySelector('.R3').addEventListener('click', () => saveChoiceAndNavigate("Inasal"));
document.querySelector('.R4').addEventListener('click', () => saveChoiceAndNavigate("Bonchon"));
document.querySelector('.R5').addEventListener('click', () => saveChoiceAndNavigate("KFC"));
document.querySelector('.R6').addEventListener('click', () => saveChoiceAndNavigate("Chowking"));
