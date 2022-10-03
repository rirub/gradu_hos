"use strict";

function selectDay(event){
    var day = event.currentTarget;
    var text = document.getElementById('selectday');

    text.innerHTML = day.innerHTML;
}

function selectTime(event){
    var time = document.getElementById('time');
    var text = document.getElementById('bu2');

    text.innerHTML = time.value;
}
