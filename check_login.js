import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getFirestore, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

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
const db = getFirestore(app);

async function atualizarInformacoes(userId, novasInformacoes) {
    const userDocRef = doc(db, "users", userId);
    try {
        await updateDoc(userDocRef, novasInformacoes);
        console.log("Informações atualizadas com sucesso no Firestore!");
    } catch (error) {
        console.error("Erro ao atualizar informações no Firestore: ", error);
    }
}

//
const dadosCadastros = {
    findByUser: user => {
        return new Promise(async (resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.open(
                "GET",
                "http://localhost:3000/users",
                true
            );

            xhr.setRequestHeader('Authorizantion', await firebase.auth().currentUser.getIdToken())

            xhr.onreadystatechange = function(){
                if(this.readyState == 4){
                    const json = JSON.parse(this.responseText);
                if(this.status != 200){
                    reject(json);
                } else {
                    resolve(json)
                }
            }
            };

            xhr.send();
        })
    }
}
//

const form = document.getElementById('updateForm');
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const cidade = document.getElementById('cidade').value;
    const escola = document.getElementById('escola').value;

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            await atualizarInformacoes(user.uid, {
                cidade: cidade,
                escola: escola
            });
        } else {
            console.log("Usuário não está logado");
            window.location.href = "login.html";
        }
    });
});
