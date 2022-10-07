document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
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