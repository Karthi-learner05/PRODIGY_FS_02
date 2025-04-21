import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAybGTlBjjn70SStaS66G2iERbDGjj09VA",
    authDomain: "employee-dafa6.firebaseapp.com",
    projectId: "employee-dafa6",
    storageBucket: "employee-dafa6.firebasestorage.app",
    messagingSenderId: "1065876246446",
    appId: "1:1065876246446:web:12d5c20c29063eda5fc23f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
document.getElementById("submit-btn").addEventListener('click',function(){
    const mail=document.getElementById("login-mail").value;
    const pass=document.getElementById("login-pass").value;
    signInWithEmailAndPassword(auth, mail, pass)
    .then((userCredential) => {
        const user = userCredential.user;
        document.getElementById("success").style.display="flex";
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        document.getElementById("inn").innerHTML=errorMessage;
        document.getElementById("failure").style.display="flex";
    });
});

document.getElementById("alert-ok-btn-s").addEventListener('click',function(){
    window.location.assign("Dashboard.html");
    document.getElementById("success").style.display="none";
    const mail=document.getElementById("login-mail").value="";
    const pass=document.getElementById("login-pass").value="";
});
document.getElementById("alert-ok-btn-f").addEventListener('click',function(){
    document.getElementById("failure").style.display="none";
});