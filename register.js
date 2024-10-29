import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";


async function initializeFirebase() {
    const response = await fetch('http://localhost:3000/config')
    const firebaseConfig = await response.json();
    
    const app = initializeApp(firebaseConfig);
    return { app, auth: getAuth(app), db: getFirestore(app) };
}

const submit = document.getElementById('submit');

submit.addEventListener("click", async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const age = document.getElementById('age').value;

    const { auth, db } = await initializeFirebase();

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const userDocRef = doc(db, "users", user.uid);

        await setDoc(userDocRef, {
            email: user.email,
            age: age
        });

        alert('Usuário criado com sucesso e salvo no Firestore!');
        window.location.href = "okregistro.html";
    } catch (error) {
        console.error("Erro ao criar usuário ou salvar no Firestore:", error);
        alert("Erro: " + error.message);
    }
});
