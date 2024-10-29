import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBSx998VsW44-exlbZ20w01MhueNZbhZqM",
    authDomain: "teste-login-fa23b.firebaseapp.com",
    projectId: "teste-login-fa23b",
    storageBucket: "teste-login-fa23b.appspot.com",
    messagingSenderId: "147492272320",
    appId: "1:147492272320:web:d5c294a64304bfc1785525"  
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const submit = document.getElementById('submit');
submit.addEventListener("click", function(event){
    event.preventDefault()

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;


    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {

    const user = userCredential.user;
    alert('Entrando...')
    window.location.href = "oklogin.html"

    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
})})