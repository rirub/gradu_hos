"use strict";

const hosID = document.querySelector("#userID");
const hosName = document.querySelector("#userName");
const password = document.querySelector("#password");
const password2 = document.querySelector("#password2");
const hosAddress1 = document.querySelector("#userAddress1");
const hosAddress2 = document.querySelector("#userAddress2");
const hosNumber = document.querySelector("#userNumber");
const signupBtn = document.querySelector("#signupBtn");

signupBtn.addEventListener("click",hossignup);

var psword = 0;

function check(){
    var p1 = password.value;
    var p2 = password2.value;
    if (p1.length < 4) {
        alert("비밀번호를 다시 입력하시오.");
        return false;
    }
    if(p1 != p2){
        alert("비밀번호가 일치하지 않습니다.");
        return false;
    }

    else{
        alert("비밀번호가 일치합니다.");
        psword = 1;
        document.getElementById('che').style.color = 'green';
        return true;
    }
    
}

function is_checked(){
    var checkbox = document.getElementById('flexCheckDefault');
    var is_ck = checkbox.checked;

    if(is_ck != true){
        alert("개인정보 제공 동의에 체크해주세요.");
        return false;
    }
    else if(psword != 1){
        alert("비밀번호를 확인해주세요.");
        return false;
    }
    else{
        return true;
    }

    
}



function hossignup(){
   const req = {
    hosID : hosID.value,
    hosName: hosName.value,
    password :password.value,
    hosAddress1: hosAddress1.value,
    hosAddress2: hosAddress2.value,
    hosNumber: hosNumber.value,
   };
   
   console.log(req);

   fetch("/signup",{
    method : "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body : JSON.stringify(req),
   }).then((response) => response.json())
    .then((data) => {
        if(data.code!=200){
            return alert("요청에문제가생겼습니다.");
        }
    const jwt = data.result.jwt;
    console.log(jwt);
    localStorage.setItem("x-access-token", jwt);
    alert(data.message);
    return location.replace("/login");
  });
}

