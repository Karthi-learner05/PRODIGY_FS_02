import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getDatabase , ref, set , onValue ,push , remove} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAybGTlBjjn70SStaS66G2iERbDGjj09VA",
    authDomain: "employee-dafa6.firebaseapp.com",
    databaseURL: "https://employee-dafa6-default-rtdb.firebaseio.com",
    projectId: "employee-dafa6",
    storageBucket: "employee-dafa6.firebasestorage.app",
    messagingSenderId: "1065876246446",
    appId: "1:1065876246446:web:12d5c20c29063eda5fc23f"
};

const app = initializeApp(firebaseConfig);
const db=getDatabase(app);
const UserListDB=ref(db,"users");

const idEl=document.querySelector("#id");
const nameEl=document.querySelector("#name");
const ageEl=document.querySelector("#age");
const genderEl=document.querySelector("#gender");
const roleEl=document.querySelector("#role");
const cityEl=document.querySelector("#city");
const mailEl=document.querySelector("#mail");
const tblbodyEl=document.querySelector("#tblbody");
const frmEl=document.querySelector("#frm");
const sbmtbtn=document.querySelector("#sbm-btn");

frmEl.addEventListener('submit',function(e){

    e.preventDefault();

    if(!nameEl.value.trim()||!ageEl.value.trim()||!genderEl.value.trim()||!cityEl.value.trim()||!roleEl.value.trim())
    {
        alert("Please enter all details");
        return;
    }

    if(idEl.value){
        set(ref(db,"users/"+idEl.value),{
            name : nameEl.value.trim(),
            age : ageEl.value.trim(),
            gender : genderEl.value.trim(),
            city : cityEl.value.trim(),
            role : roleEl.value.trim(),
            mail : mailEl.value.trim(),
        });
        document.getElementById("id").value="";
        document.getElementById("name").value="";
        document.getElementById("gender").value="";
        document.getElementById("age").value="";
        document.getElementById("city").value="";
        document.getElementById("mail").value="";
        document.getElementById("role").value="";
        sbmtbtn.innerHTML="CREATE";
        showEditAlert();
        return;
    }
    const newUser={
        name : nameEl.value.trim(),
        age : ageEl.value.trim(),
        gender : genderEl.value.trim(),
        city : cityEl.value.trim(),
        role : roleEl.value.trim(),
        mail : mailEl.value.trim(),
    }
    push(UserListDB,newUser);
    showAddAlert();
    document.getElementById("id").value="";
    document.getElementById("name").value="";
    document.getElementById("gender").value="";
    document.getElementById("age").value="";
    document.getElementById("city").value="";
    document.getElementById("mail").value="";
    document.getElementById("role").value="";
});

function showAddAlert() {
    const alertBox = document.getElementById("alert-box-add");
    const progressBar = document.getElementById("progressBar-add");

    alertBox.classList.remove("show");
    progressBar.style.width = "0%";

    setTimeout(() => {
        alertBox.classList.add("show");
        progressBar.style.width = "90%";

        setTimeout(() => {
            alertBox.classList.remove("show");
            progressBar.style.width = "0%";
        }, 2000);
        }, 50);
    }

function showEditAlert() {
    const alertBox = document.getElementById("alert-box-edit");
    const progressBar = document.getElementById("progressBar-edit");

    alertBox.classList.remove("show");
    progressBar.style.width = "0%";

    setTimeout(() => {
        alertBox.classList.add("show");
        progressBar.style.width = "90%";

        setTimeout(() => {
            alertBox.classList.remove("show");
            progressBar.style.width = "0%";
        }, 2000);
        }, 50);
    }

function showDelAlert() {
    const alertBox = document.getElementById("alert-box-del");
    const progressBar = document.getElementById("progressBar-del");

    alertBox.classList.remove("show");
    progressBar.style.width = "0%";

    setTimeout(() => {
        alertBox.classList.add("show");
        progressBar.style.width = "90%";

        setTimeout(() => {
            alertBox.classList.remove("show");
            progressBar.style.width = "0%";
        }, 2000);
        }, 50);
    }

onValue(UserListDB,function(snapshot){
    if(snapshot.exists()){
        let userArray=Object.entries(snapshot.val());
        tblbodyEl.innerHTML="";
        for(let i=0;i<userArray.length;i++)
        {
            let currentUser=userArray[i];
            let currentUserID=currentUser[0];
            let currentUserVal=currentUser[1];
            tblbodyEl.innerHTML+=`
                    <tr>
                                <td class="s-no">${i+1}</td>
                                <td class="n-a-m-e">${currentUserVal.name}</td>
                                <td class="e-m">${currentUserVal.mail}</td>
                                <td class="a-g-e">${currentUserVal.age}</td>
                                <td class="g-e-n">${currentUserVal.gender}</td>
                                <td class="c-t">${currentUserVal.city}</td>
                                <td class="r-o">${currentUserVal.role}</td>
                                <td class="e-d">
                                    <div class="e"  data-id="${currentUserID}" >
                                        <i class="fa fa-pencil-square-o"aria-hidden="true"></i>
                                    </div>
                                    <div class="d"  data-id="${currentUserID}" >
                                        <i class="fa fa-trash-o"aria-hidden="true"></i>
                                    </div>
                                </td>
                    </tr>
                    `;
        }
    }
    else{
        tblbodyEl.innerHTML="<tr class='empy'><td colspan='8' style='text-align:center;'>-- No Employee Detail Exist --</td></tr>";
    }
});

document.addEventListener('click',function(e)
{
    if(e.target.classList.contains("e"))
    {
        const id=e.target.dataset.id;
        const tdEl=e.target.closest("tr").children;
        idEl.value=id;
        nameEl.value=tdEl[1].textContent;
        ageEl.value=tdEl[3].textContent;
        genderEl.value=tdEl[4].textContent;
        cityEl.value=tdEl[5].textContent;
        roleEl.value=tdEl[6].textContent;
        mailEl.value=tdEl[2].textContent;
        sbmtbtn.innerHTML="UPDATE";
    }
    else if(e.target.classList.contains("d"))
    {
        const id=e.target.dataset.id;
        let data=ref(db,`users/${id}`);
        remove(data);
        showDelAlert();
    }
});
