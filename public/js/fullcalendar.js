const hosIdx = window.localStorage.getItem('hosIdx');

function getResInfo(){
    const req = { hosIdx : hosIdx };    
    fetch("/getInfo",{
        method : "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body : JSON.stringify(req),
        })
        .then((response) => response.json())
        .then((data) => {
            const resInfo = data.result;
            if(resInfo.length<1){
                return alert("예약 정보가 없습니다.");
            }
            
            for(var i=0;i<resInfo.length;i++){
            console.log( resInfo[i].userName, resInfo[i].Date,resInfo[i].Time );
            localStorage.setItem('title',resInfo[i].userName);
            localStorage.setItem('date',resInfo[i].Date);

        
        }
        });

}
getResInfo();
document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var name = localStorage.getItem('title');
    var date = localStorage.getItem('date');
    var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    events: [
        { 
            title: name,
            allDay: false,
            start: date
        },
        {
            title: '강은영',
            allDay: false,
            start: '2022-10-05T02:30'
        },
        {
            title: '박소영',
            allDay: false,
            start: '2022-10-05T16:30'
        }
    ],
    editable: false,

    eventClick: function(info){
        let year = info.event.start.getFullYear();
        let month = info.event.start.getMonth()+1;
        let date = info.event.start.getDate();
        let hour = info.event.start.getHours();
        let minute = info.event.start.getMinutes();

        let start = year + "." + month + "." + date + " " + "예약자";
        let num = hour + '시 ' + minute + '분' ;

        let contents = `
        <div style="font-weight: bold; font-size:20px; margin-bottom: 30px; text-align:center; color:white">
        <i class="fa-solid fa-clipboard-list"></i>  &nbsp;
        ${start}
        <br><br>
        </div>
        <div style="font-size: 15px; margin-bottom: 20px; color:white">
            <i class="fa-regular fa-square"></i> &nbsp;
            이름 : ${info.event.title} <br>
            &nbsp; &nbsp;&nbsp;&nbsp;
            시간 : ${num}
            <br><br>
            
        </div>`;

        $("#popup").html(contents);
        $("#popup").bPopup({
            speed: 650,
            transition: "slideIn",
            transitionClose: "slideBack",
            position: [($(document).width()-300)/2,120]
        });
        info.jsEvent.stopPropagation();
        info.jsEvent.preventDefault();
    },
    firstDay: 1,
        titleFormat: function (date) {
        year = date.date.year;
        month = date.date.month + 1;

        return year + "년 " + month + "월";
        },
    });

    

    calendar.render();


});
function refreshPage(){
    window.location.reload();
} 

// 로그아웃 버튼 이벤트 연결
const btnSignOut = document.querySelector("#sign-out");
btnSignOut.addEventListener("click",signOut);
// 로그아웃
function signOut(event){
    localStorage.removeItem("x-access-token");
    location.replace("/login");
}
