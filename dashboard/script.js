// Import necessary modules from Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = { 
    apiKey: "AIzaSyDHf5XLrcpem1bGS0dC6XoPqTiXpsp96Cs",
    authDomain: "avirtualsc-a35b9.firebaseapp.com",
    projectId: "avirtualsc-a35b9",
    storageBucket: "avirtualsc-a35b9.appspot.com",
    messagingSenderId: "397229973670",
    appId: "1:397229973670:web:2b73e66499d1419621d467"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Variables for user info
const userName = document.getElementById("user-name");
const userEmail = document.getElementById("user-email");
const userPhoto = document.querySelector(".user-photo");

// Fetch user data when the user is authenticated
onAuthStateChanged(auth, async (user) => {
    if (user) {
        try {
            // Get user document reference
            const docRef = doc(db, "usuarios", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const userData = docSnap.data();
                
                // Display user data
                userName.textContent = `${userData.nombre || ''} ${userData.apellido || ''}`.trim();
                userEmail.textContent = userData.email ? `Email: ${userData.email}` : '';
                userPhoto.src = userData.foto || "./perfil.png";
            } else {
                console.log("No user data found");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    } else {
        console.log("No user currently logged in");
        window.location.href = "/index.html"; // Redirection in case the user is not logged in
    }
});

// Log out the user
document.getElementById("logout-btn").addEventListener("click", () => {
    signOut(auth).then(() => {
        window.location.reload(); // Refresh the page after logging out
    }).catch((error) => {
        console.error("Error during logout:", error);
    });
});

// Panel functionality
const mainContent = document.getElementById("main-content");

document.getElementById("dashboard-btn").addEventListener("click", () => {
    mainContent.innerHTML = `
        <h2>Dashboard</h2>
        <p>Bienvenido al panel de inicio. Aquí podrás ver una visión general de tu aula virtual.</p>
    `;
});

document.getElementById("courses-btn").addEventListener("click", () => {
    mainContent.innerHTML = `
        <h2>Mis Cursos</h2>
        <p>Lista de cursos a los que estás inscrito.</p>
    `;
});

document.getElementById("assignments-btn").addEventListener("click", () => {
    mainContent.innerHTML = `
        <h2>Tareas</h2>
        <p>Lista de tareas pendientes y entregadas.</p>
    `;
});

document.getElementById("grades-btn").addEventListener("click", () => {
    mainContent.innerHTML = `
        <h2>Calificaciones</h2>
        <p>Consulta tus calificaciones de los cursos.</p>
    `;
});

document.getElementById("profile-btn").addEventListener("click", () => {
    mainContent.innerHTML = `
        <h2>Perfil</h2>
        <p>Información personal y opciones de actualización de tu perfil.</p>
    `;
});

document.getElementById("resources-btn").addEventListener("click", () => {
    mainContent.innerHTML = `
        <h2>Recursos</h2>
        <p>Accede a los recursos y materiales del curso.</p>
    `;
});
