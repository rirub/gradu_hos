//let url = "http://127.0.0.1:3001";
const jwt = localStorage.getItem("x-access-token");
setHeader(jwt);

async function setHeader(jwt){
    if(!jwt){
        return false;
    }
    fetch("/jwt",{
        method : "GET",
        headers: { 
        "x-access-token": jwt
    },
    //body : {}
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.code==403){
            //잘못된 토큰이면 로그아웃되도록
            signOut();
            return false;
        }
    //유효한 토큰일 경우

    const hosIdx = data.result.hosIdx;
    const hostName = data.result.hosName;
    //console.log(hosIdx);
    window.localStorage.setItem("hosIdx",hosIdx);
    // const userName = data.result.userName;
    const spanNickname = document.querySelector(".nickname");
    console.log(hostName);
    spanNickname.innerHTML = hostName;


//    const userData = {
//         userIdx : userIdx,
//         userName: userName
//    }

    return true;

    });
}

const btnSignout=document.querySelector("#sign-out");
btnSignout.addEventListener("click",signOut);
function signOut(){
    localStorage.removeItem("x-access-token");
    localStorage.removeItem("hosIdx");
    location.replace("/login"); //새로고침
    }

    // export {userData};